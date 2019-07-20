const express = require('express');
const compression = require('compression');

const solarSystemsService = require('./service/solar-systems.service');
const eveApiService = require('./service/eve-api.service');

// TODO: needs a logger

const app = express();
const port = '3000';
app.use(compression());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('pages/index', { systemData: JSON.stringify(solarSystemsService.getSystemData()) });
});
app.get('/healthcheck', (req, res) => res.send({ uptime: process.uptime() }));
app.get('/systemdata', (req, res) => res.send(solarSystemsService.getSystemData()));
app.listen(port, () => process.stdout.write('express is running\n'));

function querySystemData() {
  process.stdout.write('querying for system data\n');
  eveApiService.getSystemJumps()
    .then(systemJumps => solarSystemsService.updateSystemJumps(systemJumps))
    .then(() => process.stdout.write('updated system jumps\n'))
    .catch(error => new Error(error));

  eveApiService.getSystemKills()
    .then(systemKills => solarSystemsService.updateSystemKills(systemKills))
    .then(() => process.stdout.write('updated system kills\n'))
    .catch(error => new Error(error));
}

const tenMinutes = 1000 * 60 * 10;
setInterval(querySystemData, tenMinutes);
querySystemData();
