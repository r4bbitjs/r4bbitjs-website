---
id: request-tracer
description: Tutorial of how to use request tracing functionalities in r4bbitjs.
---

# Request Tracer

Microservice communication usually includes multiple requests coming from different places. In order to seperate requests from each other we use request tracers.

Request tracer is basically the function that assigns a unique identifier to each request. Even though the request actually makes calls to different services, requestId should stay the same until the end of the request tracer's journey.

## Default Request Tracer