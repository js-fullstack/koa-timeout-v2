# koa-timeout-v2
Middleware of Koa v2, 408 "request time-out" will be return if request execute timeout, ctx.state.timeout will be set to ture at same time.

## Install
npm install koa-timeout-v2

## API

```
timeout(delay, options)
```
##### delay: time out (ms)
##### option: {status, message, callback}


## Sample

#### Simple
```
const timeout = require('koa-timeout-v2');
const Koa = require('koa');
const app = new Koa();

app.use(timeout(5000)) ;
```

#### With callback
```
const timeout = require('koa-timeout-v2');
const Koa = require('koa');
const app = new Koa();

function callback(ctx, delay) {
  //TODO timeout handle
}

app.use(timeout(5000,{callback})) ;
```

#### use ctx.state.timeout
```
const timeout = require('koa-timeout-v2');
const Koa = require('koa');
const app = new Koa();

function stop() {
  return async (ctx, next) => {
    if(!ctx.state.timeout) {
      await next();
    }
  }
}

app.use(timeout(5000)) ;
app.use(stop());
app.use(bodyParse());
app.use(stop());
...
```

#### Customize error
```
const timeout = require('koa-timeout-v2');
const Koa = require('koa');
const app = new Koa();

app.use(timeout(5000,{status:503, message:'service unavailable'})) ;
```
