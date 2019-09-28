```

```

<h1  align="center">💥messy-hooks💥</h1>
<div  align="center">Contains (many) different react hooks (so it's called *messy* hooks)</div>

## Demo

[live demo](https://xhmm.github.io/messy-hooks/) (site looks ugly😅)

## Install

`npm i messy-hooks`

## APIs

**Below examples are not in detailed and ready-to-use, checkout [examples folder](https://github.com/XHMM/messy-hooks/tree/master/examples) for practical usages.**



### useRequest

using `fetch` for request, **only support json response**.

```js
const { makeRequest, requestInfo } = useRequest(url, options);
```

| name        | desc                                                         |
| ----------- | ------------------------------------------------------------ |
| url         | should be same as `fetch` first parameter                    |
| options     | should be same as `fetch` second parameter but without `body` option |
| makeRequest | a function:  `(body)=>void`  to make a request call          |
| requestInfo | an object: `{ loading, error, errorEntity, data, status }`   |

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
    makeRequest(JSON.stringify({
        name: 'leo'
    });
    
    if(loading) {}
    if(error) { console.err(errorEntity); }
    
    /*
    enum UseRequestStatus {
  		'Idle' = 'Idle', // initial status
  		'Fetching' = 'Fetching',
  		'FetchSuccess' = 'FetchSuccess',
  		'FetchError' = 'FetchError'
    }
    */
    if(status === UseRequestStatus.FetchSuccess) {}
    
    return <div>{JSON.stringify(data)}</div>
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
| timerData  | an object contains timer data, see below example             |
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
    
    return <div>{JSON.stringify(timerData)}</div>
}
```

------

### useCanvas

```js
const canvasRef = useCanvas(draw)
```

| name | desc                                                         |
| ---- | ------------------------------------------------------------ |
| draw | should be a function: `(context)=>void` . it should be wrapped within `useCallback` depend on your usage. |

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
const size = useSize(elementRef);		
```

| name       | description                                                  |
| ---------- | ------------------------------------------------------------ |
| elementRef | should be an object returned by `useRef`  and `elementRef.current`  should reference to a dom element. |
| size       | `size` is `null`  when `elementRef.current` not  referenced to dom(normally occured in first render) , or it will be an object contains element size and position info:  `{ x, y, width, height, top, right, bottom, left }` |

#### example

```js
import { useRef } from 'react';
import { useSize } from 'messy-hooks';

function Cmp() {
    const ref = useRef();
    const size = useSize(ref);
    console.log(size); // logged twice: first is null and second is an actual object
    return <div ref={ref}> Hi </div>
}
```