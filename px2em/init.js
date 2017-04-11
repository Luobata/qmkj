var fs = require('fs');
var path = require('path');
var px2em = require('./px2em.js');

var resource = '../resource/';
var css = '../css/index.css';

if (!fs.existsSync(resource)) {
    fs.mkdirSync(resource);
}
fs.writeFileSync(resource + 'index.css', fs.readFileSync(css), 'utf-8');
px2em(resource + 'index.css');

