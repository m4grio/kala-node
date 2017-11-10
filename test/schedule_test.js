'use strict'

/* globals describe, it */

const Schedule = require('..').Schedule
const assert = require('assert')

describe('Schedule', () => {
  it('should accept either three params or an object', () => {
    var date = new Date()
    var times = Math.random()
    var interval = 'P1DT1M'

    var withThreePArams = new Schedule(times, date, interval)
    var withObject = new Schedule({times: times, start: date, interval: interval})

    assert.strictEqual(typeof withThreePArams, 'object')
    assert.equal(withThreePArams.toString(), withObject.toString())
  })

  it('should accept null for the `times` param', () => {
    assert.doesNotThrow(() => {
      new Schedule(null, new Date(), 'P1').toString()
    })
  })
})
