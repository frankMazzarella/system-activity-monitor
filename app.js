const express = require('express');
const compression = require('compression');

const solarSystemsService = require('./service/solar-systems.service');
const eveApiService = require('./service/eve-api.service');

// TODO: needs a logger

const app = express();
const port = '3000';
app.use(compression());
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index', { systems: solarSystemsService.getSystems() }));
app.get('/systems', (req, res) => res.send(solarSystemsService.getSystems()));
app.get('/healthcheck', (req, res) => res.send({ uptime: process.uptime() }));
app.listen(port, () => console.log('express is running'));

eveApiService.getSystemJumps()
  .then(systemJumps => solarSystemsService.updateSystemJumps(systemJumps))
  .then(() => process.stdout.write('updated system jumps\n'))
  .catch(error => new Error(error));

eveApiService.getSystemKills()
  .then(systemKills => solarSystemsService.updateSystemKills(systemKills))
  .then(() => process.stdout.write('updated system kills\n'))
  .catch(error => new Error(error));
