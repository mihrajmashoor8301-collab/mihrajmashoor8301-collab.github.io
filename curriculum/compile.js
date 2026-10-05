// curriculum/compile.js - Compiles modular stage files into unified learning-data.js
const fs = require('fs');
const path = require('path');

const stages = require('./stages');
const stage0 = require('./stage0');
const stage1 = require('./stage1');
const stage2 = require('./stage2');
const stage3 = require('./stage3');
const stage4 = require('./stage4');
const stage5 = require('./stage5');
const stage6 = require('./stage6');
const stage7_9 = require('./stage7-9');
const stage10 = require('./stage10');
const practicalLabs = require('./practical-labs');

const allRooms = [
  ...stage0,
  ...stage1,
  ...stage2,
  ...stage3,
  ...stage4,
  ...stage5,
  ...stage6,
  ...stage7_9,
  ...stage10
];

console.log(`Compiling ${stages.length} stages, ${allRooms.length} core rooms, and ${practicalLabs.length} practical labs...`);

const output = `/**
 * Endlessus Learning Hub - Comprehensive Curriculum Database
 * 
 * Auto-compiled from modular curriculum sources.
 * Total Stages: ${stages.length}
 * Total Core Rooms: ${allRooms.length}
 * Total Practical Labs: ${practicalLabs.length}
 * 
 * Designed for zero-knowledge beginners to Junior Penetration Testers.
 */

const ENDLESSUS_STAGES = ${JSON.stringify(stages, null, 2)};

const ENDLESSUS_ROOMS = ${JSON.stringify(allRooms, null, 2)};

const ENDLESSUS_PRACTICAL_LABS = ${JSON.stringify(practicalLabs, null, 2)};

// Helper Lookup Index
const ENDLESSUS_ROOM_MAP = {};
ENDLESSUS_ROOMS.forEach(r => { ENDLESSUS_ROOM_MAP[r.id] = r; });

const ENDLESSUS_LAB_MAP = {};
ENDLESSUS_PRACTICAL_LABS.forEach(l => { ENDLESSUS_LAB_MAP[l.id] = l; });

console.log('[Endlessus Database] Loaded ' + ENDLESSUS_ROOMS.length + ' rooms across ' + ENDLESSUS_STAGES.length + ' stages + ' + ENDLESSUS_PRACTICAL_LABS.length + ' practical labs.');

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ENDLESSUS_STAGES,
    ENDLESSUS_ROOMS,
    ENDLESSUS_PRACTICAL_LABS,
    ENDLESSUS_ROOM_MAP,
    ENDLESSUS_LAB_MAP
  };
}
`;

const targetPath = path.join(__dirname, '..', 'learning-data.js');
fs.writeFileSync(targetPath, output, 'utf8');
console.log(`Successfully compiled to ${targetPath} (${(output.length / 1024).toFixed(1)} KB)`);
