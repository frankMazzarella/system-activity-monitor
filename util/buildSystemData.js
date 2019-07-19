const fs = require('fs');
const path = require('path');
const jsYaml = require('js-yaml');

// Set to the location of the EVE Static Data Export (SDE)
const eveStaticExportDirectory = path.resolve(__dirname, '../');

const systemIndex = {};
const newEdenDirectory = path.resolve(eveStaticExportDirectory, 'sde', 'fsd', 'universe', 'eve');
fs.readdirSync(newEdenDirectory).forEach((region) => {
  const regionsDirectory = path.resolve(eveStaticExportDirectory, newEdenDirectory, region);
  fs.readdirSync(regionsDirectory).forEach((constellation) => {
    const constellationsDirectory = path.resolve(eveStaticExportDirectory, newEdenDirectory, region, constellation);
    if (fs.lstatSync(path.resolve(constellationsDirectory)).isDirectory()) {
      fs.readdirSync(constellationsDirectory).forEach((system) => {
        const systemDirectory = path.resolve(eveStaticExportDirectory, newEdenDirectory, region, constellation, system);
        if (fs.lstatSync(systemDirectory).isDirectory()) {
          const systemData = jsYaml.safeLoad(fs.readFileSync(path.resolve(systemDirectory, 'solarsystem.staticdata')));
          systemIndex[systemData.solarSystemID] = { name: system, security: systemData.security };
        }
      });
    }
  });
});
fs.writeFileSync(path.resolve(eveStaticExportDirectory, 'systemData.json'), JSON.stringify(systemIndex));
