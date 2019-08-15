<h1  align="center">💥messy-hooks💥</h1>
<div  align="center">Contains (many) different react hooks (so it's called *messy* hooks)</div>

## Demo

[live demo](https://xhmm.github.io/messy-hooks/) (site looks ugly😅)

## Install

`npm i messy-hooks`

## Usage

below introductions are not very detail and ready-to-use, but you can check [examples folder](https://github.com/XHMM/messy-hooks/tree/master/examples) for practical usage.



### useRequest

use fetch api, **only support json response**.

```js
const { makeRequest, requestInfo } = useRequest(url, options);
```

| name        | desc                                                       |
| ----------- | ---------------------------------------------------------- |
| url         | same as `fetch` first parameter                            |
| options     | same as `fetch` second parameter but without `body` option |
| makeRequest | `(body)=>void`   pass in `body` and make request call      |
| requestInfo | `{ loading, error, errorEntity, data, status }`            |

#### example

```js
import { useRequest, UseRequestStatus } from 'messy-hooks';

// 'error' is boolean,
// 'errorEntity' is the actual error object,
// 'status' is a helper enum property for you to identity request loading/error/success, get more in src/useRequest.tsx
const { makeRequest, requestInfo: {loading, error, errorEntity, data, status} } = useRequest("http://xxx.com", {
    method: 'POST',
    // don't pass `body` here
});

// pass body to `makeRequest`
makeRequest({
    name: 'leo'
});

if(loading) {}
if(error) { console.err(errorEntity); }
if(status === UseRequestStatus.FetchSuccess) {}
```

------

### useTimer

get elapsed time, second as unit.

#### example

```js
import { useTimer } from 'messy-hooks';

const { timerData, startTimer, stopTimer, resetTimer } = useTimer();

// hours*3600 + minuts*60 + seconds = rawSeconds
const { rawSeconds, hours, minutes, seconds } = timerData;
```

------

### useCanvas

```js
const canvasRef = useCanvas(draw)
```

| name | desc                                                         |
| ---- | ------------------------------------------------------------ |
| draw | `(context)=>void`  draw anything in this function. You should wrap it within `useCallback` |

#### example

```js
import { useCanvas } from 'messy-hooks';

const canvasRef = useCanvas((ctx) => {
    // draw here
});

<canvas ref={canvasRef} />
```

------

### useSize

get element size and position info

#### example

```js
import { useSize } from 'messy-hooks';

const { x, y, width, height, top, right, bottom, left } = useSize(document.documentElement);
```

