const fs = require('fs');
const path = require('path');

// TODO: handle file does not exist, give instructions
const systemDataFilePath = path.resolve(__dirname, '../', 'systemData.json');
const systemData = JSON.parse(fs.readFileSync(systemDataFilePath));

// TODO: handle rejects
// TODO: verify this is singleton

function updateSystemJumps(systemJumps) {
  return new Promise((resolve, reject) => {
    systemJumps.forEach((systemJump) => {
      const system = systemData[systemJump.system_id];
      system.jumps = systemJump.ship_jumps;
      systemData[systemJump.system_id] = system;
    });
    resolve();
  });
}

function updateSystemKills(systemKills) {
  return new Promise((resolve, reject) => {
    systemKills.forEach((systemKill) => {
      const system = systemData[systemKill.system_id];
      system.npcKills = systemKill.npc_kills;
      system.podKills = systemKill.pod_kills;
      system.shipKills = systemKill.ship_kills;
      systemData[systemKill.system_id] = system;
    });
    resolve();
  });
}

function getSystemData() {
  return Object.keys(systemData).map((systemId) => {
    const system = systemData[systemId];
    return [
      system.name,
      system.security,
      system.jumps,
      system.shipKills,
      system.podKills,
      system.npcKills,
    ];
  });
}

// TODO: is this allowing system data to be modified? its probably sending by reference.
module.exports.getSystemData = getSystemData;
module.exports.updateSystemJumps = updateSystemJumps;
module.exports.updateSystemKills = updateSystemKills;
