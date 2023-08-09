Client class is used to publish messages to the RabbitMQ server

## Methods

### publishMessage()

Publishes message to the given exchange

**_Parameters_**

- `message`: `Buffer | string | unknown` - Message to be published
- `options`: [ClientOptions](#clientoptions) - Options for publishing the message

**_Example usage_**

Example in which the client publishes a message to the exchange `my-exchang` with the routing key `my.routing-key`

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

<div class="alert alert--warning" role="alert">
  Beware that publish message does not accept any response returned. If you want to receive a response use <a href="#publishrpcmessage">publishRPCMessage</a> instead.
</div>
<br />

---

### publishRPCMessage()

Publishes an RPC message to the given exchange and waits for a single response

**_Parameters_**

- `message`: `Buffer | string | unknown` - Message to be published
- `options`: [ClientRPCOptions](#clientrpcoptions) - Options for publishing the message

**_Example usage_**

Example in which the client publishes a message to the exchange `test` with the routing key `test` and waits for the response with a timeout of 1 second

```ts
const rpcMessage = { message: "OurMessage", nested: { value: 15 } };

await client.publishRPCMessage(rpcMessage, {
  exchangeName: "rpc-exchange-name",
  routingKey: "rpc.routing.key",
  replyQueueName: "rpc-reply-queue", // A reply queue will be created for listening rpc answers
  timeout: 5_000, // optional After 5 secs, returns what it receives
  responseContains: {
    // optional What data the response object will contain
    content: true,
    headers: true,
    signature: true,
  },
  correlationId: "some-random-nanoid", // optional r4bbit provides a default random value,
  loggerOptions: {
    // optional
    isConsumeDataHidden: false, // default is true
    isSendDataHidden: false, // default is true
  },
  sendType: "json", // optional default is 'json'
  receiveType: "json", // optional default is 'json'
  replySignature: "rpc-server-signature", // optional
});
```

---

### publishMultipleRPC()

Publishes messages to the given exchange and waits for _multiple_ responses

It has 2 possible strategies.

- Listening for all the messages and returning the replies after if timeout occurs or expected number of replies gets received.
- Using a handler function that listens for all the messages, and at the moment that the message gets received, executing necessary actions.

We are giving examples for both of those options

**_Parameters_**

- `message`: `Buffer | string | unknown` - Message to be published
- `options`: [ClientMultipleRPC](#clientmultiplerpc) - Options for publishing multiple rpc messages.

**_Example usage_**

Example with specified number of expected replies (`waitedReplies: 2`) within timeout (`timeout: 5_000`):

```ts
await client.publishMultipleRPC(objectMessage, {
  exchangeName: "multiple-rpc-exchange-name",
  routingKey: "multiple-rpc.routing.key",
  replyQueueName: "multiple-rpc-reply-queue",
  timeout: 5_000,
  waitedReplies: 2,
  responseContains: {
    content: true,
    headers: true,
    signature: true,
  },
  correlationId: "some-random-nanoid", // optional r4bbit provides a default random value,
  loggerOptions: {
    // optional
    isConsumeDataHidden: false,
    isSendDataHidden: false,
  },
  sendType: "json", // optional default is 'json',
  receiveType: "json", // optional default is 'json',
  replySignature: "server-1", // optional,
});
```

Example with unlimited number of replies that can occur within specified timespan `timeout: 5_000`:

```ts
await client.publishMultipleRPC(objectMessage, {
  exchangeName: "multiple-rpc-exchange-name",
  routingKey: "multiple-rpc.routing.key",
  replyQueueName: "multiple-rpc-reply-queue",
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

---

### close()

Closes the connection with RabbitMq.

**_Parameters_**

None

**_Example usage_**

```ts
const client = await getClient("amqp://localhost");
await client.close();
```

## Types

### ClientOptions

```ts
type ClientOptions = {
  exchangeName: string;
  routingKey: string;
  sendType?: MessageType;
  publishOptions?: Options.Publish; // Linked below 👇
  loggerOptions?: {
    isDataHidden?: boolean;
  };
};
```

<div class="alert alert--warning" role="alert">
  r4bbitjs is built over amqplib, and we are supporting all the parameters amqplib provides.
  See <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/amqplib/properties.d.ts#L108">Options.Publish</a> here
</div>
<br />

### ServerRPCOptions

```ts
type ServerRPCOptions = {
  publishOptions?: Options.Publish; // Linked below 👇
  consumeOptions?: Options.Consume; // Linked below 👇
  sendType?: MessageType;
  correlationId?: string;
  replySignature?: string;
  responseContains?: ServerResponseContains;
  loggerOptions?: {
    isSendDataHidden?: boolean;
    isConsumeDataHidden?: boolean;
  };
};
```

<div class="alert alert--warning" role="alert">
  r4bbitjs is built over amqplib, and we are supporting all the parameters amqplib provides.
  See <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/amqplib/properties.d.ts#L108">Options.Publish</a> here
  See <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/amqplib/properties.d.ts#L129">Options.Consume</a> here
</div>
<br />

### ClientRPCOptions

Link for the custom types used as property of ClientRPCOptions type

- [MessageType](#messagetype)
- [ResponseContains](#responsecontains)
- [ServerRPCOptions](#serverrpcoptions)

```ts
type ClientRPCOptions = {
  exchangeName: string;
  routingKey: string;
  replyQueueName: string;
  receiveType?: MessageType;
  timeout?: number;
  responseContains?: ResponseContains;
} & ServerRPCOptions;
```

### ClientMultipleRPC

Link for the custom types used as property of ClientMultipleRPC type

- [MessageType](#messagetype)
- [ResponseContains](#responsecontains)
- [ServerRPCOptions](#serverrpcoptions)

```ts
export type ClientMultipleRPC = {
  exchangeName: string;
  routingKey: string;
  replyQueueName: string;
  receiveType?: MessageType;
  timeout?: number;
  responseContains?: ResponseContains;
  waitedReplies?: number;
  handler?: (msg: Record<string, unknown>) => void;
} & ServerRPCOptions;
```

### MessageType

```ts
type MessageType = "json" | "string" | "object";
```

### ResponseContains

```ts
type ResponseContains = {
  signature?: boolean;
  headers?: boolean;
  content?: boolean;
};
```

### ServerResponseContains

```ts
type ServerResponseContains = {
  headers?: boolean;
  content?: boolean;
};
```
