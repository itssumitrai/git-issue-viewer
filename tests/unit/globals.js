require('babel/register')({
    ignore: [/node_modules\/.*\.js$/],
    extensions: ['.jsx', '.js']
});

var chai = require('chai');
var dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
global.expect = global.expect || chai.expect;
