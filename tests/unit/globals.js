require('babel/register')({
    ignore: [/node_modules\/.*\.js$/],
    extensions: ['.jsx', '.js']
});

require('jsx-test');

var chai = require('chai');
var dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
global.expect = global.expect || chai.expect;
