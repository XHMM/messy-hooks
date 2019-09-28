```

```

<h1  align="center">💥messy-hooks💥</h1>
<div  align="center">Contains (many) different react hooks (so it's called *messy* hooks)</div>

## Demo

[live demo](https://xhmm.github.io/messy-hooks/) (site looks ugly😅)

## Install

`npm i messy-hooks`

## APIs

**below examples are not very detail and ready-to-use, checkout [examples folder](https://github.com/XHMM/messy-hooks/tree/master/examples) for practical usages.**



### useRequest

using `fetch` for request, **only support json response**.

```js
const { makeRequest, requestInfo } = useRequest(url, options);
```

| name        | desc                                                         |
| ----------- | ------------------------------------------------------------ |
| url         | same as `fetch` first parameter                              |
| options     | same as `fetch` second parameter but without `body` option   |
| makeRequest | a function: `(body)=>void` ,  pass in `body` and make request call |
| requestInfo | an object:`{ loading, error, errorEntity, data, status }`    |

#### example

```js
import { useRequest, UseRequestStatus } from 'messy-hooks';

function Cmp() {
    // 'error' is boolean,
    // 'errorEntity' is the actual error object,
    // 'status' is a helper enum property for you to identity request status.
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
}
```

------

### useTimer

get elapsed time, second as unit.

```js
const { timerData, startTimer, stopTimer, resetTimer } = useTimer();
```

| name       | desc                                                         |
| ---------- | ------------------------------------------------------------ |
| timerData  | an object contains timer data, see below`example`            |
| startTimer | a function, call to start timer                              |
| stopTimer  | a function, call to stop timer                               |
| resetTimer | a function, call to reset `timerData` but not change timer status(running or stopped) |

#### example

```js
import { useTimer } from 'messy-hooks';

function Cmp() {
    const { timerData, startTimer, stopTimer, resetTimer } = useTimer();

	// hours*3600 + minuts*60 + seconds = rawSeconds
	const { rawSeconds, hours, minutes, seconds } = timerData;
}
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

function Cmp() {
    const canvasRef = useCanvas((ctx) => {
    // draw here
	});

	return <canvas ref={canvasRef} />
}
```

------

### useSize

get element size and position info

```js
const { x, y, width, height, top, right, bottom, left } = useSize(elementRef);		
```

| name       | description                                                  |
| ---------- | ------------------------------------------------------------ |
| elementRef | an object returned by `useRef`  and `current` value should be an dom element |

#### example

```js
import { useSize } from 'messy-hooks';

const { x, y, width, height, top, right, bottom, left } = useSize(elementRef);
```