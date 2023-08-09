Client class is used to publish messages to the RabbitMQ server

## Methods

### `init()`

Initializes the client, used only internally. Users don't have to call this method

```ts
interface init(
    connectionUrls: ConnectionUrl[] | ConnectionUrl,
    options?: InitRabbitOptions
): Promise<void>
```

**_Parameters_**

- `connectionUrls` - RabbitMQ connection url or array of connection urls
  - It specifies the connection URL (possibly with options) that are used to connect to the RabbitMQ server. It can be a single URL or an array of URLs. If an array is provided, the client will try to connect to the first URL, if it fails, it will try to connect to the second URL and so on. If no URL is provided, the client will try to connect to the default URL `amqp://localhost`.
- `options` - Options for initializing the client

**_Example usage_**

```ts
const client = new Client();
await client.init("amqp://localhost");
```

---

### `publishMessage()`

Publishes message to the given exchange

**_Parameters_**

- `message` - Message to be published
- `options` - Options for publishing the message

**_Example usage_**

Example in which the client publishes a message to the exchange `test` with the routing key `test`

```ts
const client = await getClient("amqp://localhost");
await client.publishMessage("Hello World", {
  exchangeName: "test",
  routingKey: "test",
});
```

Example in which the client publishes a message to the exchange `test` with the routing key `test` and the data sanitization in enabled (`isDataHidden` is set to `true`)

```ts
const client = await getClient("amqp://localhost");
await client.publishMessage("Hello World", {
  exchangeName: "test",
  routingKey: "test",
  loggerOptions: {
    isDataHidden: true,
  },
});
```

---

### `publishRPCMessage()`

Publishes message to the given exchange and waits for the response

**_Parameters_**

- `message` - Message to be published
- `options` - Options for publishing the message

**_Example usage_**

Example in which the client publishes a message to the exchange `test` with the routing key `test` and waits for the response

```ts
const client = await getClient("amqp://localhost");
const response = await client.publishRPCMessage("Hello World", {
  exchangeName: "test",
  routingKey: "test",
});
```

Example in which the client publishes a message to the exchange `test` with the routing key `test` and waits for the response with a timeout of 1 second

```ts
const client = await getClient("amqp://localhost");
const response = await client.publishRPCMessage("Hello World", {
  exchangeName: "test",
  routingKey: "test",
  timeout: 1000,
});
```

---

### `publishMultipleRPC()`

Publishes message to the given exchange and waits for multiple responses

**_Parameters_**

- `message` - Message to be published
- `options` - Options for publishing the message

**_Example usage_**

Example in which the client publishes a message to the exchange `test` with the routing key `test` and waits for the response

```ts
const client = await getClient("amqp://localhost");
const response = await client.publishRPCMessage("Hello World", {
  exchangeName: "test",
  routingKey: "test",
});
```

Example in which the client publishes a message to the exchange `test` with the routing key `test` and waits for the response with a timeout of 1 second

```ts
const client = await getClient("amqp://localhost");
const response = await client.publishRPCMessage("Hello World", {
  exchangeName: "test",
  routingKey: "test",
  timeout: 1000,
});
```

Example in which the client publishes a message to the exchange `test` with the routing key `test` and waits for the response with a timeout of 1 second and waits for 2 responses

```ts
const client = await getClient("amqp://localhost");
const response = await client.publishRPCMessage("Hello World", {
  exchangeName: "test",
  routingKey: "test",
  timeout: 1000,
  waitedReplies: 2,
  handler: (data) => {
    console.log(data);
  },
});
```

---

### `close()`

Closes the connection

**_Parameters_**

None

**_Example usage_**

```ts
const client = await getClient("amqp://localhost");
await client.close();
```
