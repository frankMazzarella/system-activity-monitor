const solarSystemsService = require('./service/solar-systems.service');
const eveApiService = require('./service/eve-api.service');

// const systems = solarSystemsService.getSystems();
// TODO: needs a logger

eveApiService.getSystemJumps()
  .then(systemJumps => solarSystemsService.updateSystemJumps(systemJumps))
  .then(() => process.stdout.write('updated system jumps\n'))
  .catch(error => new Error(error));

eveApiService.getSystemKills()
  .then(systemKills => solarSystemsService.updateSystemKills(systemKills))
  .then(() => process.stdout.write('updated system kills\n'))
  .catch(error => new Error(error));
