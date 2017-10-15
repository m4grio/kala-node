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
});
