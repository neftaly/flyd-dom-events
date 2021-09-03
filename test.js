const tape = require('tape')
const sinon = require('sinon')
const flydDomEvents = require('./index')
const flyd = require('flyd')

tape('Calling with correct params', test => {
  test.plan(7)

  const types = ['mouseclick', 'contextmenu']
  const target = {
    addEventListener: sinon.spy(),
    removeEventListener: sinon.spy()
  }
  const options = { fakeOption: true }

  // create stream
  const stream = flydDomEvents(types, target, options)
  test.ok(flyd.isStream(stream), 'returns a flyd stream')
  test.ok(
    target.addEventListener.calledTwice &&
      target.addEventListener.calledWith('mouseclick', stream, options) &&
      target.addEventListener.calledWith('contextmenu', stream, options),
    'attaches listeners'
  )
  test.ok(
    target.removeEventListener.notCalled,
    'does not immediately detach listeners'
  )

  // check event triggering
  const listener = sinon.spy()
  const {
    firstCall: {
      args: [, onmouseclick] // function that would be triggered by an onmouseclick DOM event
    },
    secondCall: {
      args: [, oncontextmenu]
    }
  } = target.addEventListener

  stream.map(listener)
  test.ok(listener.notCalled, 'does not trigger early')

  const fakeEvent1 = { type: 'mouseclick' }
  onmouseclick(fakeEvent1)
  test.ok(
    listener.calledOnceWith(fakeEvent1),
    'triggers events correctly (1/2)'
  )

  const fakeEvent2 = { type: 'contextmenu' }
  oncontextmenu(fakeEvent2)
  test.ok(
    listener.calledTwice && listener.calledWith(fakeEvent2),
    'triggers events correctly (2/2)'
  )

  // destroy stream
  stream.end(true)
  test.ok(
    target.removeEventListener.calledTwice &&
      target.removeEventListener.calledWith('mouseclick', stream, options) &&
      target.removeEventListener.calledWith('contextmenu', stream, options),
    'detaches listeners'
  )
})
