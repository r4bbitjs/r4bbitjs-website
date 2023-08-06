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


***Parameters***
* `connectionUrls` - RabbitMQ connection url or array of connection urls
   * It specifies the connection URL (possibly with options) that are used to connect to the RabbitMQ server. It can be a single URL or an array of URLs. If an array is provided, the client will try to connect to the first URL, if it fails, it will try to connect to the second URL and so on. If no URL is provided, the client will try to connect to the default URL `amqp://localhost`. 
* `options` - Options for initializing the client

***Example usage***
```ts
    const client = new Client();
    await client.init('amqp://localhost');
```

---
### `publishMessage()`

---
### `publishRPCMessage()`

---
### `publishMultipleRPC()`

---

### `close()`

---
## Examples
```ts
const client = getClient('amqp://localhost');
await client.publishMessage('Hello World', {
exchangeName: 'test',
routingKey: 'test',
});
```
