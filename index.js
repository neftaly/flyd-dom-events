const flyd = require('flyd')

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
const flydDomEvents = (types, target, options) => {
  const stream = flyd.stream()
  types.forEach(type => target.addEventListener(type, stream, options))
  flyd.on(
    () =>
      types.forEach(type => target.removeEventListener(type, stream, options)),
    stream.end
  )
  return stream
}

module.exports = flydDomEvents
