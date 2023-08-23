---
id: server-client
description: An example of server-client communication in r4bbitjs
---

# Server Client Communication

This guide will provide a detailed example of how the communication between server and client is actually occurring.

The example we create will be a modified version of getting started; we will go through all the options the r4bbitjs API provides and explain all the details.

<div class="alert alert--primary" role="alert">
  All the example code presented in this section can be accessed over <a href="https://github.com/r4bbitjs/r4bbitjs/blob/dev/examples/client-server/index.ts">r4bbitjs/examples/client-server</a>
</div>
<br />

## Create a server

While creating a server, we support all the possible options node-amqp-connection-manager gives; those options have good defaults; therefore, change them only if you know what you're doing.

```ts
const server = await getServer(
  ["amqp://guest:guest@localhost:5672/", "amqp://fallback@localhost:5672/"],
  {
    connectOptions: {
      // optional (both connectOptions and all its options)
      reconnectTimeInSeconds: 10,
      heartbeatIntervalInSeconds: 10,
      // ...
    },
    createChannelOptions: {
      // optional (both createChannelOptions and all its options)
      name: "my-channel-name",
      // ...
    },
  }
);
```

Log presented after the connection is established.

![An example that displays log of establishing the connection](./assets/server-client/connection-established-log.png)

## Register a route

For a server to listen for the messages, we need to send them to a specific topic and exchange.
r4bbitjs uses only [topic exchange](https://www.cloudamqp.com/blog/rabbitmq-topic-exchange-explained.html#:~:text=Topic%20exchange%20is%20a%20built,to%20one%20or%20more%20queues.), which can actually listen a regular expression.

Handler function can be either [AckHandler](/docs/api-reference/server#ackhandler) or just [Handler](/docs/api-reference/server#handler); with AckHandler, you have the opportunity to acknowledge messages when you finish your operations. By default, AckHandler is used. To use just the Handler function, specify it in the options of registerRoute.

```ts
const handlerFunc: ServerTypes.AckHandler =
  (
    { ack, nack } // In the handler function we provide an ack method you can use to acknowledge the message.
  ) =>
  (msg: string | object) => {
    if (!msg) return;
    if (!ack) return;

    try {
      // process the message from the client
      ack();
    } catch (error) {
      console.log("error", error);
    }
  };
```

server.registerRoute checks for the given queue name, and if it does not exist in the exchange, it creates it.

r4bbitjs has its own default logger (more about this topic in `advanced guides/logger` docs), but you can replace it with a custom one (such as winston etc.) if you want to.

To anonimize the logged data, set `isDataHidden` option to `true` (check out the example below).

![An example that displays anoymous logs](./assets/server-client/anonymous-log.png)

```ts
  // create a server with one route
  await server.registerRoute(
    {
      queueName: 'my-queue',
      exchangeName: 'my-exchange',
      routingKey: 'my.*',
    },
    handlerFunc,
    {
      consumeOptions: { // optional
        noAck: false, // default is true
      },
      loggerOptions: { // optional
        isDataHidden: true, // default is false
      },
      responseContains: {
        content: true, // default is true
        headers: true, // default is false
      },
    }
  );
);
```

## Create a client and send the message

While creating a client, we support all the possible options node-amqp-connection-manager gives; those options have good defaults; therefore, change them only if you know what you're doing.

```ts
const client = await getClient(
  ["amqp://guest:guest@localhost:5672/", "amqp://fallback@localhost:5672/"],
  {
    connectOptions: {
      // optional (both connectOptions and all its options)
      reconnectTimeInSeconds: 10,
      heartbeatIntervalInSeconds: 10,
      // ...
    },
    createChannelOptions: {
      // optional (both createChannelOptions and all its options)
      name: "my-channel-name",
      // ...
    },
  }
);
```

An example of a client sending the message:

```ts
await client.publishMessage(
  { content: "hello world!!!" },
  {
    exchangeName: "my-exchange",
    routingKey: "my.routing-key",
    loggerOptions: {
      isDataHidden: false, // default is true,
    },
    sendType: "json", // default is 'json'
  }
);
```

When a client sends the message, we print the log below.

![An example that displays log of publishing a message](./assets/server-client/publish-log.png)

## Close the connection

You don't need to close the connection of your r4bbitjs `client` and `server`. Because in a normal app, a `server` should listen until the end of the application's lifetime.

But there are certain cases where you want to close the connection; we also provide this option.

To close a connection with the rabbitMQ broker, you can use `close` method - it's available for both server and client.

```ts
await client.close();
await server.close();
```

A log is displayed after the connection is gracefully closed.

![An example that displays log of closing the connection](./assets/server-client/connection-closed-log.png)
