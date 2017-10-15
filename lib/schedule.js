'use strict'

/**
 *
 * @param {String|Null|Object} times
 * @param {Date} start
 * @param {String} interval
 */
function Schedule(times, start, interval) {
    if (times && typeof times === 'object') {
        var opts = times;
        times = opts.times;
        start = opts.start;
        interval = opts.interval;
    }

    times = 'R' + (times || '');
    start = start.toISOString();

    this.options = [times, start, interval];
}

Schedule.prototype.toString = function() {
    return this.options.join('/')
}

module.exports = Schedule;
