const OPS = require('./functions'); // functions.js | functions.node

const config = require('./config');
// node searches in its module
// in a folder named node_modules
// $HOME/node_modules
// $HOME/node_libraries
//  $NODE_PATH = D:/MODULES;
console.log(config);
// native module fs
const fs = require('fs');
// reads json file
const api = require('./api.json');
console.log(api);
console.log(OPS);
console.log(OPS.calcRectArea(6,6))
