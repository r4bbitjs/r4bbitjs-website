Set's up logger and request tracer configurations for r4bbit. **Must be used before getClient or getServer **

### setupR4bbit()

Sets up r4bbit with the given options.

**_Parameters_**

- `options`: [SetupR4bbitOptions](#setupr4bbitoptions) - An options object which contains the logger and requestTracer options.

**_Example usage_**

Example in which custom requestTracer and logger engine is used (in this case `console.log`), both colors and json are enabled, and custom colors are passed.

```ts
setupR4bbit({
  logger: {
    engine: {
      info: (str: string) => console.log(str),
      debug: (str: string) => console.debug(str),
      error: (str: string) => console.error(str),
    },
    options: {
      isColor: true,
      isJson: true,
      colors: {
        basic: "#AF2BBF", // only hex values allowed
        key: "#A14EBF",
        string: "#6C91BF",
        number: "#5FB0B7",
        boolean: "#5BC8AF",
        null: "#C1C1C1",
        undefined: "#D16666",
        array: "#B6C649",
      },
    },
  },
  requestTracer: {
    setReqId: (reqId: string) => (globalScopedVariable = reqId),
    getReqId: () => globalScopedVariable,
  },
});
```

---

## Types

### SetupR4bbitOptions

Link for the custom types used as property of SetupR4bbitOptions type

- [LoggerOptions](#loggeroptions)
- [ILogger](#ilogger)
- [SetReqId](#setreqid)
- [GetReqId](#getreqid)

```ts
type SetupR4bbitOptions = {
  logger?: { options?: LoggerOptions; engine?: ILogger };
  requestTracer?: {
    setReqId?: SetReqId;
    getReqId?: GetReqId;
  };
};
```

### LoggerOptions

Link for the custom types used as property of LoggerOptions type

- [Colors](#colors)

```ts
type LoggerOptions = {
  isColor?: boolean;
  isJson?: boolean;
  colors?: Colors;
};
```

### Colors

```ts
type Colors = {
  basic?: string;
  key?: string;
  string?: string;
  number?: string;
  boolean?: string;
  null?: string;
  undefined?: string;
  array?: string;
};
```

### ILogger

```ts
type ILogger = {
  info: (message: string) => void;
  error: (message: string) => void;
  debug: (message: string) => void;
};
```

### SetReqId

```ts
export type SetReqId = (message: string) => void;
```

### GetReqId

```ts
export type GetReqId = () => string;
```
