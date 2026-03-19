const express = require('express');
const client = require('prom-client'); //step 1

const router = express.Router();


const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP Requests',
});

const totalhealthcheck= new client.Counter({
  name:'http_health_checks',
  help: 'Total_health_check',
});


router.get('/health', (req, res) => {
  totalhealthcheck.inc()
  res.status(200).json({ status: 'OK' });
});



router.get('/users', (req, res) => {
  requestCounter.inc();
  res.json([
    { id: 1, name: 'Dhanush' },
    { id: 2, name: 'DevOps Pro' }
  ]);
});


router.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

module.exports = router;