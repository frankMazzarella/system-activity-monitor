const request = require('request');

console.log('EVE Online system activity monitor is running');

request.get('https://esi.evetech.net/latest/universe/system_jumps/?datasource=tranquility', (error, response, body) => {
  console.log(JSON.parse(body));
});

request.get('https://esi.evetech.net/latest/universe/systems/?datasource=tranquility', (error, response, body) => {
  console.log(JSON.parse(body));
});

request.get('https://esi.evetech.net/latest/universe/system_kills/?datasource=tranquility', (error, response, body) => {
  console.log(JSON.parse(body));
});
