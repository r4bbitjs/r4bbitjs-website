---
id: multiple-rpc
description: An example of multiple rpc communication
---

# Multiple RPC Communication

RabbitMQ out of the box gives us 2 possible communication patterns server-client and the rpc.

However it gives us enough tools to build our own patterns

Biggest feature of r4bbitjs is actually providing a design pattern that is not implemented by RabbitMQ. **Multiple rpc communication.**

In this pattern, basically client publishes an **rpc message** to an exchange with a topic name. Then receives **multiple replies** from different servers.

There are two possible strategies of receiving multiple replies from rpc servers.

1. If we know how many replies we will receive then we wait until receiving all the replies and take an action afterwards.
2. If we don't know how many replies we will receive then we execute the actions as soon as they are received.

In this guide we will walk through both of the possible cases and show their differences.

<div class="alert alert--primary" role="alert">
  All the example code presented in this section can be accessed over 
  <ul>
    <li>
      <a href="https://github.com/r4bbitjs/r4bbitjs/tree/dev/examples/multiple-rpc/index.ts">
      r4bbitjs/examples/multiple-rpc</a>
    </li>
    <li>
      <a href="https://github.com/r4bbitjs/r4bbitjs/blob/dev/examples/multiple-rpc-unknown-replies/index.ts">r4bbitjs/examples/multiple-rpc-unknown-replies</a>
    </li>
  </ul>
</div>
<br />

## Setting Up RPC Servers

We can create a multiple rpc server just like how we create an rpc server.
We are actually using the exact same method `registerRPCRoute`.

In our example r4bbitjs server will listen for 2 different topics (`my.*` and `*.routing-key`), therefore when client publishes a message with the topic `my.routing-key` both of them will reply.

Our handler just replies the message it receives.

```ts
const server = await getServer("amqp://guest:guest@localhost:5672/");

const handler: ServerTypes.RpcHandler =
  (reply) => (msg: Record<string, unknown> | string) => {
    reply(msg);
  };

const objectMessage = { message: "OurMessage" };

await server.registerRPCRoute(
  {
    queueName: "queue-1",
    routingKey: "my.*",
    exchangeName: "test-exchange",
  },
  handler,
  {
    replySignature: "server-1", // optional
  }
);

await server.registerRPCRoute(
  {
    queueName: "queue-2",
    routingKey: "*.routing-key",
    exchangeName: "test-exchange",
  },
  handler,
  {
    replySignature: "server-2", // optional
  }
);
```

<div class="alert alert--primary" role="alert">
  We are just passing elementary parameters in our examples, to see all the possible options please visit <a href="/docs/api-reference/server#registerrpcroute">api reference for registerRPCRoute</a>
</div>
<br />

But wait, what is the `replySignature` we added to the `registerRPCRoute` options?

In order for clients to seperate the source of the reply we add the replySignature, thanks to that when client receives the replies, the message will contain the server's specific signature, message content and optionally the header parameters. Content and headers options are also available in client-server and rpc messaging.

Below, there is an example of the received log, with the signature of the server

![An example that displays server signature](./assets/rpc-multiple/server-reply-signature.png)

## Client Message Publish (Limited Replies Strategy)

We mentioned that we have two possible strategies to listen for multiple rpc messages. And we seperate them based on, if we know the numberof replies we receive.

First we will look at the example of limited replies. Then we will go over unlimited one.

Client has a specific method to publish multiple multiple rpc messages.

If the client knows how many replies it will receive, it passes a waitedReplies value while executin `publishMultipleRPC` method.

If waitedReplies are received before the timeout occurs then client automatically resolves the promise and returns the replies it receives.

If timeout occurs before all the waitedReplies received, then client returns all the replies it received (even though all expected ones didn't come),

If it doesn't receive any reply then returns an empty array.

```ts
await client.publishMultipleRPC(objectMessage, {
  exchangeName: "test-exchange",
  routingKey: "my.routing-key",
  replyQueueName: "multiple-rpc-client-reply-queue",
  timeout: 5_000,
  waitedReplies: 2,
  responseContains: {
    content: true,
    headers: true,
    signature: true,
  },
});
```

Client produces one log for every messages it receives.

![Examples of received replies](./assets/rpc-multiple/server-1-reply.png)
![Examples of received replies](./assets/rpc-multiple/server-reply-signature.png)

## Client Message Publish (Unlimited Replies Strategy)

For the unlimited replies strategy, what we do is, having a handler function that handles the messages instantly. The biggest difference between this strategy and limited reply one, in the limited replies we wait until receiving all the messages then pass the answers as an array of actions..

On this one however we pass the messages to the handler function as soon as they are received.

```ts
await client.publishMultipleRPC(objectMessage, {
  exchangeName,
  routingKey,
  replyQueueName,
  timeout: 5_000,
  responseContains: {
    content: true,
    headers: true,
    signature: true,
  },
  handler: async (msg) => {
    // Handler is taking actions immediately when reply is received.
    switch (msg.signature) {
      case "server-1":
        console.log("Server-1 Received:", msg);
        break;
      case "server-2":
        console.log("Server-2 Received:", msg);
        break;
      default:
        console.log("Unknown resource Received", msg);
    }
  },
});
```

We suggest using switches for executing different actions based on the message source. But don't forget in order the messages to be seperated by the source the server actually needs to add the server signature.

If the server signature is added by the server, we can seperate our actions based on the source

![Examples of received replies in unlimited replies rpc](./assets/rpc-multiple-unlimited/rpc-multiple-unlimited-reply-example.png)
