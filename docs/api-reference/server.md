Server class is used to register routes to receive messages

## Methods

### `init()`

Server initializes the connection to RabbitMQ

<div class="alert alert--warning margin-bottom--md" role="alert">
  It is only used internally, users should not use it
</div>

**_Parameters_**

- `connectionUrls` - connection url or array of connection urls
- `options` - options for the server

### `getWrapper()`

It returns amqplib-connection-manager's channel wrapper

<div class="alert alert--warning margin-bottom--md" role="alert">
  It is only used internally, users should not use it
</div>

### `registerRoute()`

**_Parameters_**

- `connection` - connection object
- `handlerFunction` - function to handle received message
- `options` - options for the server

**_Example usage_**

1. Server instance calls the registerRoute method, setting up a route using specified exchangeName, queueName, and routingKey.
2. The registered handler function logs incoming messages and responds with the string "Hello World".

```ts
const server = await getServer("amqp://localhost");
await server.registerRoute(
  {
    exchangeName: "exchangeName",
    queueName: "queueName",
    routingKey: "routingKey",
  },
  async (message) => {
    console.log(message);
    return "Hello World";
  }
);
```

This example demonstrates how to set up a RabbitMQ message route, specify the behavior of the message consumer, and customize the logger and response settings:

As a third argument to registerRoute, it provides an options object that specifies:

- consumeOptions with noAck set to true, meaning that the consumer does not need to acknowledge the messages.
- responseContains with signature set to false, indicating that the response does not contain a signature.
- loggerOptions with isDataHidden set to false, meaning the logger will display the data in the log without sanitizing it.

```ts
const server = await getServer("amqp://localhost");
await server.registerRoute(
  {
    exchangeName: "exchangeName",
    queueName: "queueName",
    routingKey: "routingKey",
  },
  async (message) => {
    console.log(message);
    return "Hello World";
  },
  {
    consumeOptions: {
      noAck: true,
    },
    responseContains: {
      signature: false,
    },
    loggerOptions: {
      isDataHidden: false,
    },
  }
);
```

## `registerRPCRoute()`

Registers a new RPC route on the server

**_Parameters_**

- `connection` - The connection details for the RPC route.
- `handlerFunction` - The function to handle incoming RPC requests.
- `options` - Optional options for the RPC route.

**_Example usage_**

**_1. The Basic Use Case:_**

```ts
const server = await getServer("amqp://localhost");
await server.registerRPCRoute(
  {
    exchangeName: "exchangeName",
    queueName: "queueName",
    routingKey: "routingKey",
  },
  async (message) => {
    console.log(message);
    return "Hello World";
  }
);
```

In this example, we're establishing an RPC route with the server. The route is defined with certain exchangeName, queueName, and routingKey. Once a message is received on this route, the server logs the message and responds with "Hello World".

**_2. The Custom Options Use Case:_**

```ts
const server = await getServer("amqp://localhost");
await server.registerRPCRoute(
  {
    exchangeName: "customExchange",
    queueName: "customQueue",
    routingKey: "customKey",
  },
  async (message) => {
    console.log("Received: ", message);
    return { response: "Custom Response" };
  },
  {
    consumeOptions: { noAck: true },
    responseContains: { signature: false },
    loggerOptions: { isDataHidden: false },
  }
);
```

In this example, we're establishing an RPC route as before, but now we're using custom route parameters (exchangeName, queueName, routingKey) and a custom message handler. We’ve specified consumeOptions, responseContains, and loggerOptions for more control over the way the message handling operates

**_3. The Complex Handler Use Case:_**

```ts
const server = await getServer("amqp://localhost");
await server.registerRPCRoute(
  {
    exchangeName: "orders",
    queueName: "process_orders",
    routingKey: "order_key",
  },
  async (message) => {
    let order = JSON.parse(message.content.toString());
    await processOrder(order);
    return { status: "success" };
  },
  {
    consumeOptions: { noAck: false },
    loggerOptions: { isDataHidden: true },
  }
);
```

In this example, we're receiving orders on an RPC route, and processing each order within the message handler. The server sends back a success status once the order is processed. We’ve also set consumeOptions and loggerOptions to control acknowledgment and logging.
