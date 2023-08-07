---
sidebar_position: 1
---

# Getting Started

**r4bbitjs** is the simplest and most efficient way of using **RabbitMQ**, In just a few lines of code you can make your RabbitMQ servers listen for messages and your RabbitMQ client to send messages.

## Installation

Installing r4bbitjs is quite straight forward.

```bash
npm install r4bbitjs
```

<div class="alert alert--info" role="alert">
  r4bbitjs has first-class support for <strong>TypeScript</strong>, you can take a look at the api reference for types
</div>

## Setting Up The Server

In order to receive a message first we must have a server listening for it. In r4bbitjs creating a server is super easy.

```ts
import { getServer } from "@r4bbit/r4bbit";

//..
const localRabbitUrl = "amqp://guest:guest@localhost:5672/";
const server = await getServer(localRabbitUrl);
```

<div class="alert alert--warning" role="alert">
  In order this example to work, you must run a local RabbitMQ broker.
  <br />
  <a href="https://www.rabbitmq.com/download.html">Read how to setup a RabbitMQ instance</a>
</div>
<br />

Now we created a server. You can think server as your router instance. We just created an instance of it.
Currently it is not listening for anything. Let's change that.

## Make The Server Actually Listen

We have to register routes to server for it to listen

```ts
await server.registerRoute(
  {
    queueName: "my-queue",
    exchangeName: "my-exchange",
    routingKey: "my.*",
  },
  handlerFunc
);
```

But wait where is the `handlerFunc` defined?? No worries we didn't define it yet, let's focus on the `registerRoute` method first.

We simply give the name of the queue, exchange and topic key to our server. r4bbitjs by default use topic exchange, because of RabbitMQ implementation of topic exchange it automatically catches messages using its pattern.

This server will handle all the messages send with the topic key `my.{simply-anything}`.
It can be `my.dinosaurs` or `my.i.don.t.care`.

## Creating a Handler Function

When the message receive to the server we want to take some actions. The handler function exactly created for this purpose.

```ts
import { getServer, ServerTypes } from '@r4bbit/r4bbit';

const handlerFunc: ServerTypes.AckHandler =
  ({ ack }) =>
  (msg: string | object) => {
    ack();
    console.log('Received message is ->', msg);
  };
```

By default r4bbitjs uses acknowledgement instead of auto acknowledgement, so that the received message can wait in the queue if something goes wrong, in your function.

Other than acknowledgement, we are just console logging the message we receive in our function.

But what a server used for if it never receives a message? Let's also add the client and see the whole picture.

## Adding Client

When adding a client instance we add them the same way as the server

```ts
import { getServer, getClient, ServerTypes } from '@r4bbit/r4bbit';

//..
const localRabbitUrl = "amqp://guest:guest@localhost:5672/";
const client = await client(localRabbitUrl);
```

## Publishing a Message With The Client

Alright we came to the last point let's use our client to publish a message to our created server.

```ts
await client.publishMessage(
  { content: 'hello world!!!' },
  {
    exchangeName: 'my-exchange',
    routingKey: 'my.routing-key',
  }
);
```

Easy as that! We pass the message content, exchange name and the routing key to the client and that does it all.

## The Whole Example

Let's run the whole code and see what happens!

```ts
import { getServer, getClient, ServerTypes } from '@r4bbit/r4bbit';

const main = async () => {
  const server = await getServer('amqp://guest:guest@localhost:5672/');
  const client = await getClient('amqp://guest:guest@localhost:5672/');

  const handlerFunc: ServerTypes.AckHandler =
    ({ ack }) =>
    (msg: string | object) => {
      ack();
      console.log('Received message is ->', msg);
    };

  // create a server with one route
  await server.registerRoute(
    {
      queueName: 'my-queue',
      exchangeName: 'my-exchange',
      routingKey: 'my.*',
    },
    handlerFunc
  );

  await client.publishMessage(
    { content: 'hello world!!!' },
    {
      exchangeName: 'my-exchange',
      routingKey: 'my.routing-key',
    }
  );
};

main();
```

When we execute the code, we see this prompts in the console

![Gif recording of terminal when somebody executes the above code](../static/gif/getting-started.gif)

Because of r4bbitjs comes with default logging features that's all you need for RabbitMQ communication!

Don't stop now, go to the guides and see all the other communication patterns and options r4bbitjs offers!



