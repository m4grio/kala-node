[![npm](https://img.shields.io/npm/v/kala-node.svg)](https://npm.im/kala-node)

# [Kala](https://github.com/ajvb/kala) client for Node.js

## How to use

```bash
npm install kala-node
```

```javascript

const Kala = require('kala-node')

client = new Kala.Client('https://wherever-your-kala-is-at.com/api/v1')

client.createJob(/*...*/)
client.getJob(/*...*/)
client.getJobs()
client.deleteJob(/*...*/)
client.getJobStats(/*...*/)
client.startJob(/*...*/)
client.enableJob(/*...*/)
client.getStats()
```

There's a helper to generate the `schedule` string:
```javascript

new Kala.Schedule({
    times: 20,         // To run this 20 times
    start: new Date(), // Starting now (just an example – this will actually fail)
    interval: 'PT15M', // In 15 minutes after job creation
}).toString()

// 'R20/2017-10-15T17:15:43.238Z/PT15M'
```

Pass `null` times to run a job only once:
```javascript

let start = new Date()
start.setDate(start.getHours() + 4) // In 4 hours

new Kala.Schedule({
    times: null,      // Only once
    start: start,
    interval: 'PT1M', // After 1 minute
}).toString()
```

## Testing

### Requirements

* Docker

```
make test

  Kala Client basic operations
    ✓ create a job
    ✓ retrieve a job
    ✓ retrieve all jobs
    ✓ deletes a job
    ✓ retrieve job stats
    ✓ start a job
    ✓ enable a job
    ✓ retrieve stats
    ✓ delete all jobs (44ms)

  Schedule
    ✓ should accept either three params or an object
    ✓ should accept null for the `times` param


  11 passing (188ms)
```

## Author
Written by [Mario Álvarez](https://twitter.com/m4grio)
