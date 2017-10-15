'use strict'

const papi = require('papi')
    , util = require('util')
    ;

/**
 * @param {Object} opts
 */
function Kala(opts) {
    opts = opts || {};
    if (typeof opts === 'string') {
        opts = {baseUrl: opts};
    }

    opts.header = opts.header || {};
    opts.header.accept = opts.header.accept || 'application/json';

    papi.Client.call(this, opts);

    if (opts.debug) {
        this.on('log', console.log);
    }
}
util.inherits(Kala, papi.Client);

/**
 * Creates a job
 *
 * @todo Add validators for required fields:
 *         - [ ] name
 *         - [ ] command
 *
 * @param {Object} opts
 * @param {Function} callback
 */
Kala.prototype.createJob = function(opts, callback) {
    opts = opts || {};

    return this._post({
        path: '/job/',
        body: opts,
        type: 'json',
    }, callback);
}

module.exports = Kala;
