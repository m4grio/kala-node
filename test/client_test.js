'use strict'

/* globals describe, it */

const Kala = require('..')
const assert = require('assert')

const kala = new Kala.Client('http://localhost:8000/api/v1')

describe('Kala Client basic operations', () => {
  it('create a job', (done) => {
    // let start = new Date()
    kala.createJob({
      name: 'stuff',
      command: '/bin/true'
    }, err => {
      assert.equal(err, undefined)
      done()
    })
  })

  it('retrieve a job', (done) => {
    new Promise((resolve, reject) => {
      let start = new Date()
      start.setDate(start.getHours() + 24)
      kala.createJob({
        name: 'stuff',
        command: '/bin/true',
        schedule: new Kala.Schedule(null, start, 'PT15S').toString()
      }, (err, res) => {
        assert.equal(err, undefined)
        resolve(res.body)
      })
    })
        .then(job => {
          kala.getJob(job.id, (err, res) => {
            assert.equal(err, undefined)
            assert.strictEqual(job.id, res.body.job.id)
            done()
          })
        })
  })

  it('retrieve all jobs', (done) => {
    kala.getJobs((_, res) => {
      assert(res.body.hasOwnProperty('jobs'))
      done()
    })
  })

  it('deletes a job', done => {
    new Promise((resolve, reject) => {
      let start = new Date()
      start.setDate(start.getHours() + 24)
      kala.createJob({
        name: 'stuff',
        command: '/bin/true',
        schedule: new Kala.Schedule(null, start, 'PT15S').toString()
      }, (err, res) => {
        assert.equal(err, undefined)
        resolve(res.body)
      })
    })
        .then(job => {
          kala.deleteJob(job.id, (err, res) => {
            assert.equal(err, undefined)
            assert.equal(res.statusCode, 204)
            done()
          })
        })
  })

  it('retrieve job stats', done => {
    new Promise((resolve, reject) => {
      let start = new Date()
      start.setDate(start.getHours() + 24)
      kala.createJob({
        name: 'stuff',
        command: '/bin/true',
        schedule: new Kala.Schedule(null, start, 'PT15S').toString()
      }, (err, res) => {
        assert.equal(err, undefined)
        resolve(res.body)
      })
    })
        .then(job => {
          kala.getJobStats(job.id, (err, res) => {
            assert.equal(err, undefined)
            assert(res.body.hasOwnProperty('job_stats'))
            done()
          })
        })
  })

  it('start a job', done => {
    new Promise((resolve, reject) => {
      let start = new Date()
      start.setDate(start.getHours() + 48)
      kala.createJob({
        name: 'stuff',
        command: '/bin/true',
        schedule: new Kala.Schedule(null, start, 'PT15S').toString()
      }, (err, res) => {
        assert.equal(err, undefined)
        resolve(res.body)
      })
    })
        .then(job => {
          kala.startJob(job.id, (err, res) => {
            assert.equal(err, undefined)
            assert.equal(res.statusCode, 204)
            done()
          })
        })
  })

  it('enable a job', done => {
    new Promise((resolve, reject) => {
      let start = new Date()
      start.setDate(start.getHours() + 48)
      kala.createJob({
        name: 'stuff',
        command: '/bin/true',
        schedule: new Kala.Schedule(null, start, 'PT15S').toString()
      }, (err, res) => {
        assert.equal(err, undefined)
        resolve(res.body)
      })
    })
        .then(job => {
          kala.enableJob(job.id, (err, res) => {
            assert.equal(err, undefined)
            assert.equal(res.statusCode, 204)
            done()
          })
        })
  })

  it('retrieve stats', done => {
    kala.getStats((err, res) => {
      assert.equal(err, undefined)
      assert(res.body.hasOwnProperty('Stats'))
      done()
    })
  })

    /**
     * This is ugly.
     *
     * @todo use promises here
     */
  it('delete all jobs', done => {
    let start = new Date()
    start.setDate(start.getHours() + 48)
    kala.createJob({
      name: 'stuff',
      command: '/bin/true',
      schedule: new Kala.Schedule(null, start, 'PT15S').toString()
    }, (err, res) => {
      assert.equal(err, undefined)
      kala.getJobs((_, res) => {
        assert.notEqual(Object.keys(res.body.jobs).length, 0)
        kala.deleteAll((err, res) => {
          assert.equal(err, undefined)
          assert.equal(res.statusCode, 204)
          kala.getJobs((_, res) => {
            assert.equal(Object.keys(res.body.jobs).length, 0)
            done()
          })
        })
      })
    })
  })
})
