---
id: multiple-rpc
description: An example of multiple rpc communication
---

# Multiple RPC Communication

RabbitMQ out of the box gives us 2 possible communication patternsserver-client and the rpc.

However it gives us enough tools to build nour own patterns

Biggest feature of r4bbitjs is actually providing a design pattern that is not implemented by RabbitMQ. Multiple rpc communication.

In this pattern, basically client publishes an **rpc message** to a nexchange with a topic name. Then receives **multiple replies** from different servers.

There are two possible use cases for this method.

1. If we know how many replies we will receive te wait until receiveingall the replies and take anaction. afterwards
2. We don't know how many replies we will receive therefore we execute the messages as soon as they are received.

In this guide we will walk through both of those possible cases and show their differences.

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

But wait, what is the replySignature we added.

In order for client to seperate the source of the reply we add the replySignature, thanks to that when client receives the replies, it will contain in the signature the location of the message sent.

Below there is an example of the received log, with the signatureof the server

![An example that displays server signature](./assets/rpc-multiple/server-reply-signature.png)

## Client Message Publish (Limited Replies Strategy)

We mentioned that we have two possible strategies to listen for multiple rpc messages. And we seperate them based on, if we know the numberof replies we receive.

First we will look at the example of limited replies. Then we will go over unlimited one.

// Here is a mermaid diagram that displays general structure

Client has a specific method to publish multiple multiple rpc messages.

If the client knows how many replies it will receive, it pass a waitedReplies value.

If waitedReplies receive before the timeout occurs then client automatically resolves the promise and returns the replies it receives.

If timeout occurs before all the waitedReplies received, client returns all the replies it received (even though some expected ones didn't come),

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
