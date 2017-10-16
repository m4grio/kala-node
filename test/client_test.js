'use strict'

const Kala = require('..')
    , assert = require('assert')
    ;

const kala = new Kala.Client('http://localhost:8000/api/v1');

describe('Kala Client basic operations', () => {
    it('creates a job', (done) => {
        let start = new Date();
        kala.createJob({
            name: 'stuff',
            command: '/bin/true',
        }, err => {
            assert.equal(err, undefined);
            done();
        });
    });

    it('retrieves a job', (done) => {
        new Promise((resolve, reject) => {
            let start = new Date();
            start.setDate(start.getHours() + 24);
            kala.createJob({
                name: 'stuff',
                command: '/bin/true',
                schedule: new Kala.Schedule(null, start, 'PT15S').toString(),
            }, (err, res) => {
                assert.equal(err, undefined);
                resolve(res.body);
            });
        })
        .then(job => {
            kala.getJob(job.id, (err, res) => {
                assert.equal(err, undefined);
                assert.strictEqual(job.id, res.body.job.id);
                done();
            });
        });
    });

    it('retrieves all jobs', (done) => {
        kala.getJobs((err, res) => {
            assert(res.body.hasOwnProperty('jobs'));
            done();
        });
    });

    it('deletes a job', done => {
        new Promise((resolve, reject) => {
            let start = new Date();
            start.setDate(start.getHours() + 24);
            kala.createJob({
                name: 'stuff',
                command: '/bin/true',
                schedule: new Kala.Schedule(null, start, 'PT15S').toString(),
            }, (err, res) => {
                assert.equal(err, undefined);
                resolve(res.body);
            });
        })
        .then(job => {
            kala.deleteJob(job.id, (err, res) => {
                assert.equal(err, undefined);
                assert.equal(res.statusCode, 204);
                done();
            });
        });
    });

    it('retrieves job stats', done => {
        new Promise((resolve, reject) => {
            let start = new Date();
            start.setDate(start.getHours() + 24);
            kala.createJob({
                name: 'stuff',
                command: '/bin/true',
                schedule: new Kala.Schedule(null, start, 'PT15S').toString(),
            }, (err, res) => {
                assert.equal(err, undefined);
                resolve(res.body);
            });
        })
        .then(job => {
            kala.getJobStats(job.id, (err, res) => {
                assert.equal(err, undefined);
                assert(res.body.hasOwnProperty('job_stats'));
                done();
            });
        });
    });

    it('starts a job', done => {
        new Promise((resolve, reject) => {
            let start = new Date();
            start.setDate(start.getHours() + 48);
            kala.createJob({
                name: 'stuff',
                command: '/bin/true',
                schedule: new Kala.Schedule(null, start, 'PT15S').toString(),
            }, (err, res) => {
                assert.equal(err, undefined);
                resolve(res.body);
            });
        })
        .then(job => {
            kala.startJob(job.id, (err, res) => {
                assert.equal(err, undefined);
                assert.equal(res.statusCode, 204);
                done();
            });
        });
    });

    it('enables a job', done => {
        new Promise((resolve, reject) => {
            let start = new Date();
            start.setDate(start.getHours() + 48);
            kala.createJob({
                name: 'stuff',
                command: '/bin/true',
                schedule: new Kala.Schedule(null, start, 'PT15S').toString(),
            }, (err, res) => {
                assert.equal(err, undefined);
                resolve(res.body);
            });
        })
        .then(job => {
            kala.enableJob(job.id, (err, res) => {
                assert.equal(err, undefined);
                assert.equal(res.statusCode, 204);
                done();
            });
        });
    });

    it('retrieves stats', done => {
        let start = new Date();
        kala.getStats((err, res) => {
            assert.equal(err, undefined);
            assert(res.body.hasOwnProperty('Stats'));
            done();
        });
    });

    /**
     * This is ugly.
     *
     * @todo use promises here
     */
    it('deletes all jobs', done => {
        let start = new Date();
        start.setDate(start.getHours() + 48);
        kala.createJob({
            name: 'stuff',
            command: '/bin/true',
            schedule: new Kala.Schedule(null, start, 'PT15S').toString(),
        }, (err, res) => {
            assert.equal(err, undefined);
            kala.getJobs((err, res) => {
                assert.notEqual(Object.keys(res.body.jobs).length, 0);
                kala.deleteAll((err, res) => {
                    assert.equal(err, undefined);
                    assert.equal(res.statusCode, 204);
                    kala.getJobs((err, res) => {
                        assert.equal(Object.keys(res.body.jobs).length, 0);
                        done();
                    });
                });
            });
        });
    });
});
