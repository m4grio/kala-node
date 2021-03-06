'use strict'

const papi = require('papi')
const util = require('util')

/**
 * @param {Object} opts
 */
function Kala (opts) {
  opts = opts || {}
  if (typeof opts === 'string') {
    opts = {baseUrl: opts}
  }

  opts.header = opts.header || {}
  opts.header.accept = opts.header.accept || 'application/json'

  papi.Client.call(this, opts)

  if (opts.debug) {
    this.on('log', console.log)
  }
}
util.inherits(Kala, papi.Client)

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
Kala.prototype.createJob = function (opts, callback) {
  opts = opts || {}

  return this._post({
    path: '/job/',
    body: opts,
    type: 'json'
  }, callback)
}

module.exports = Kala

/**
 * @param {Object} opts
 * @param {Function} callback
 */
Kala.prototype.getJob = function (opts, callback) {
  if (typeof opts === 'string') {
    opts = {id: opts}
  }

  this._get({
    path: ['job', opts.id].toUrlSegments()
  }, callback)
}

/**
 * @param {Function} callback
 */
Kala.prototype.getJobs = function (callback) {
  this._get({
    path: '/job/'
  }, callback)
}

/**
 * @param {Object|String} opts
 * @param {Function} callback
 */
Kala.prototype.deleteJob = function (opts, callback) {
  if (typeof opts === 'string') {
    opts = {id: opts}
  }

  this._delete({
    path: ['job', opts.id].toUrlSegments()
  }, callback)
}

/**
 * @param {Object|String} opts
 * @param {Function} callback
 */
Kala.prototype.getJobStats = function (opts, callback) {
  if (typeof opts === 'string') {
    opts = {id: opts}
  }

  this._get({
    path: ['job/stats', opts.id].toUrlSegments()
  }, callback)
}

/**
 * @param {Object|String} opts
 * @param {Function} callback
 */
Kala.prototype.startJob = function (opts, callback) {
  if (typeof opts === 'string') {
    opts = {id: opts}
  }

  this._post({
    path: ['job/start', opts.id].toUrlSegments()
  }, callback)
}

/**
 * @param {Object} opts
 * @param {Function} callback
 */
Kala.prototype.enableJob = function (opts, callback) {
  if (typeof opts === 'string') {
    opts = {id: opts}
  }

  this._post({
    path: ['job/enable', opts.id].toUrlSegments()
  }, callback)
}

/**
 *
 * @param {Function} callback
 */
Kala.prototype.getStats = function (callback) {
  this._get({
    path: '/stats/'
  }, callback)
}

/**
 * @param {Function} callback
 */
Kala.prototype.deleteAll = function (callback) {
  this._delete({
    path: '/job/all/'
  }, callback)
}

/**
 * @param {Object} opts
 */
Array.prototype.toUrlSegments = function (opts) { // eslint-disable-line
  opts = opts || {}
  opts.append = opts.append || true
  opts.prepend = opts.prepend || true

  const glue = '/'

  if (opts.prepend) {
    this.unshift(null)
  }

  if (opts.append) {
    this.push(null)
  }

  return this.join(glue)
}
