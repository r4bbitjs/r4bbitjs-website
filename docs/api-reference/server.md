Server class is used to receive messages from the RabbitMQ.

## Methods

### registerRoute()

Receives messages from a specific routing key and exchange name.
It doesn't reply responses. For response reply take a look at [registerRPCRoute](#registerrpcroute)

**_Parameters_**

- `connection`: [ServerConnection](#serverconnection) - Message to be published
- `handlerFunction`: [Handler](#handler) | [AckHandler](#ackhandler) - A handler function that is executed when a message is received.
- `options`?: [ServerOptions](#serveroptions) - Options related with received message's content
  **_Example usage_**

Example in which the server receives a message from the exchange `my-exchange` with the routing key `my.*`

Because of r4bbitjs uses topic exchange by default it means any topic name starts with `my.<any-string>`

```ts
const handlerFunc: ServerTypes.AckHandler =
  ({ ack }) =>
  (msg: string | object) => {
    console.log("Received message is ->", msg); // our
    ack(); // Manual acknowledgement (execute after your operation ends)
  };

await server.registerRoute(
  {
    queueName: "my-queue",
    exchangeName: "my-exchange",
    routingKey: "my.*",
  },
  handlerFunc,
  {
    consumeOptions: {
      noAck: false, // default is false
    },
    loggerOptions: {
      isDataHidden: true, // default is false
    },
    responseContains: {
      content: true, // default is true
      headers: true, // default is false
    },
  }
);
```

<div class="alert alert--warning" role="alert">
  Beware that publish message does not accept any response returned. If you want to receive a response use <a href="#publishrpcmessage">publishRPCMessage</a> instead.
</div>
<br />

---

### registerRPCRoute()

Registers an RPC route. It receives messages from a specific routing key and exchange name and returns a response.

**_Parameters_**

- `connection`: [ServerConnection](#serverconnection) - connection to RabbitMQ
- `handlerFunction`: [RpcHandler](#rpchandler) - function that will be executed when a message is received
- `options`?: [ServerRPCOptions](#serverrpcoptions) - server options for receiving rpc messages

**_Example usage_**

This example demonstrates the usage of the registerRPCRoute method to create a Remote Procedure Call (RPC) route. It shows setting up a server, defining an RPC route, and creating a handler function to process incoming requests and respond back to the client with processed data.

```ts
const handler: ServerTypes.RpcHandler =
  (reply: ServerTypes.Reply) => (msg: Record<string, unknown> | string) => {
    if (!msg) {
      return;
    }
    reply((msg as { content: string }).content);
  };

await server.registerRPCRoute(
  {
    queueName: serverQueueName,
    routingKey: "*.routing-key",
    exchangeName: "my-exchange",
  },
  handler,
  {
    replySignature: "rpc-server-signature",
    responseContains: {
      content: true, // default is true
      headers: true, // default is false
      signature: false, // default is false
    },
    consumeOptions: {
      noAck: false, // default is false
    },
    loggerOptions: {
      isConsumeDataHidden: false, // default is false
      isSendDataHidden: false, // default is false
    },
    publishOptions: {
      persistent: true, // default is true
      // ...
    },
    sendType: "json", // default is 'json'
  }
);

await server.registerRPCRoute(
  {
    exchangeName: "test-exchange",
    queueName: "test-queue",
    routingKey: "test-routing-key",
  },
  handler,
  {
    responseContains: { signature: true }, // optional, default: undefined - no signature in the response
    loggerOptions: {
      isSendDataHidden: true, // optional, default: false
      isConsumeDataHidden: true, // optional, default: false
    },
    consumeOptions: { noAck: false }, // optional, default: false, i.e., acknowledgments are expected
    publishOptions: { persistent: true }, // optional, default: false
    replySignature: "reply-sig", // optional, default: undefined - no reply signature
  }
);
```

---

### getWrapper()

r4bbitjs is built over amqplib and [node-amqp-connection-manager](https://github.com/jwalton/node-amqp-connection-manager), wrapper is an api exposed by node-amqp-connection-manager that allows us to do all those crazy stuff like

- deleting exchanges
- cancelling all the processes
- ...

**_Parameters_**

None

**_Example usage_**

In this example we're closing all the consumer connections and eventually the connection with the MQ itself.

```ts
await server.getWrapper().cancelAll();
await server.getWrapper().close();
```

---

### close()

Gracefully closes the connection with RabbitMQ.

**_Parameters_**

None

**_Example usage_**

```ts
await server.close();
```

## Types

### ServerConnection

```ts
type ServerConnection = {
  queueName: string;
  routingKey: string;
  exchangeName: string;
};
```

### ServerOptions

Link for the custom types used as property of ClientMultipleRPC type

- [ServerResponseContains](#serverresponsecontains)

```ts
consumeOptions?: Options.Consume;  // Linked below 👇
responseContains?: ServerResponseContains;
loggerOptions?: {
  isDataHidden?: boolean;
};
```

<div class="alert alert--warning" role="alert">
  r4bbitjs is built over amqplib, and we are supporting all the parameters amqplib provides.
  See <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/amqplib/properties.d.ts#L129">Options.Consume</a> here
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

### Handler

Handler function is a function that executes when a message is received, it should be only used when noAck option specified in the [ServerOptions.consumeOptions](#serveroptions)

```ts
type Handler = (msg: string | Record<string, unknown>) => void;
```

### AckHandler

AckHandler is a function that returns handlerFunction, the advantage of using ackHandler is, you can manually acknowledge your messages.
It should be only used when ack option specified in the [ServerOptions.consumeOptions](#serveroptions)

```ts
export type AckHandler = (ackObj: AckObj) => Handler; // Referenced above 👆
```

### RpcHandler

```ts
type RpcHandler = (
  reply: Reply
) => (msg: string | Record<string, unknown>) => void;
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
