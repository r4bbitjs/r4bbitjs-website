Client class is used to publish messages to the RabbitMQ server





## Methods
### `init()`
Initializes the client, used only internally. User's don't have to call this method
```ts
init(
    connectionUrls: ConnectionUrl[] | ConnectionUrl,
    options?: InitRabbitOptions
): Promise<void>
```

***Example usage***
```ts
    const client = new Client();
    await client.init('amqp://localhost');
```

---
## Examples
  ```ts
  const client = getClient('amqp://localhost');
  await client.publishMessage('Hello World', {
   exchangeName: 'test',
   routingKey: 'test',
  });
  ```