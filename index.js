const flyd = require('flyd')

// Create a stream of event `types` on `target`.
// `options` will be passed directly to addEventListener/removeEventListener
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
