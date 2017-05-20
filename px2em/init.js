var fs = require('fs');
var path = require('path');
var px2em = require('./px2em.js');

var resource = '../resource/';
var cssList = [
    '../css/index.css',
    '../css/dream.css',
    '../css/show.css',
    '../css/share.css',
    '../css/all.css'
];
var css = '../css/index.css';

if (!fs.existsSync(resource)) {
    fs.mkdirSync(resource);
}

cssList.forEach(function (item) {
    var name = item.split('/').pop();
    fs.writeFileSync(resource + name, fs.readFileSync(item), 'utf-8');
    px2em(resource + name);
})
// fs.writeFileSync(resource + 'index.css', fs.readFileSync(css), 'utf-8');
// px2em(resource + 'index.css');

