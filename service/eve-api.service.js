const request = require('request');

// TODO: test errors in all request functions
// TODO: refactor the request.get because wet code

module.exports.getSystemJumps = () => new Promise((resolve, reject) => {
  const endpoint = 'https://esi.evetech.net/latest/universe/system_jumps/?datasource=tranquility';
  request.get(endpoint, (error, response, body) => {
    if (error) return reject(error);
    return resolve(JSON.parse(body));
  });
});


module.exports.getSystemKills = () => new Promise((resolve, reject) => {
  const endpoint = 'https://esi.evetech.net/latest/universe/system_kills/?datasource=tranquility';
  request.get(endpoint, (error, response, body) => {
    if (error) return reject(error);
    return resolve(JSON.parse(body));
  });
});
