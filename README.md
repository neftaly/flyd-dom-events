# flyd-dom-events 

Get DOM events as a [Flyd](https://github.com/paldepind/flyd) stream

[![test](https://github.com/neftaly/flyd-dom-events/actions/workflows/action.yml/badge.svg)](https://github.com/neftaly/flyd-dom-events/actions/workflows/action.yml)

## Example
```js
import flyd as 'flyd'
import flydDomEvents as 'flyd-dom-events'

// Add event listeners for mousedown & mouseup on document.body,
// and return a stream of events
const stream = flydDomEvents(
  ['mousedown', 'mouseup'],
  document.body,
  { capture: true }
)

// Log a message every time a mousedown or mouseup event is triggered
flyd.map(
  event => console.log(event.type + ' was triggered'),
  stream
)

// Remove event listeners & close stream
const destroy = () => stream.end(true)
destroy()
```

## API
```js
/**
 * Create a stream of DOM events via addEventListener/removeEventListener
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 *
 * @name flydDomEvents
 * @param {Array<string>} types - event types
 * @param {HTMLElement} target - DOM node to attach listeners to
 * @param {Object} [options] - options for addEventListener/removeEventListener
 * @return {stream} the DOM event stream
 *
 */
````
