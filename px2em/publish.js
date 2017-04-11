var fs = require('fs');
var path = require('path');
var tools = require('nodejs-tools');
var exec = require('child_process').exec;
var px2em = require('./px2em.js');
var conf = require('./config.js');

//var config = {
//    sourceFiles: [
//        'C:/Users/Yaodoggy/Documents/Program Files/Wamp/wamp/www-changyan-v3/frontend-mdevp/mobile-cmt-list',
//        'C:/Users/Yaodoggy/Documents/Program Files/Wamp/wamp/www-changyan-v3/frontend-mdevp/mobile-user-center',
//        'C:/Users/Yaodoggy/Documents/Program Files/Wamp/wamp/www-changyan-v3/frontend-mdevp/mobile-cmt-box'
//        ],
//    endFile: 'C:/Users/Yaodoggy/Documents/mdevp/test'
//};
var config = {};

/**
 * @description 拷贝模块并处理
 * @param {orign|string} 原模块地址 确保符合一个模块的基本规则
 * @param {end|string} 拷贝的目的地址
 */
var copyFiles = function (orign, end) {
    if (!fs.existsSync(end)) {
        fs.mkdirSync(end);
    }
    var root = orign;
    var moduleName = orign.split('/').pop();

    var walk = function (dir) {
        fs.readdirSync(dir).forEach(function (item) {
            var fileName = dir.replace(/\\/g, '\/') + item;
            var stat = fs.statSync(fileName);
            var filePath = end + '/' + moduleName + dir.replace(root, '') + item;
            console.log(fileName);
            console.log(filePath);
            if (!stat.isDirectory()) {
                fs.writeFileSync(filePath, fs.readFileSync(fileName), 'utf-8');
                if (fileName.match(/\.css$/)) {
                    px2em(filePath);
                }
                return;
            } else if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }

            walk(fileName + '/');
        });
    };
    orign = orign.replace(/\\/g, '/') + '/';
    fs.mkdirSync(end + '/' + moduleName);
    walk(orign);
    return moduleName;
};


var init = function (homePath) {
    config = conf.publishConf;
    config.endFile = homePath + '/' + config.endFile;
    var modules = [];
    tools.file.rmdir(config.endFile);
    config.sourceFiles.forEach(function (item, index) {
        var moduleName = copyFiles(item, config.endFile);
        modules.push(moduleName);
    });
    var mdep = function  (moduleName) {
        process.chdir(config.endFile + '/' +  moduleName);
        console.log('local: ' + process.cwd());
        exec('mdep publish -n test', function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            if (modules.length) {
                mdep(modules.pop());
            }
        });
    };
    mdep(modules.pop());
}
exec('set HOMEDRIVE && set HOMEPATH', function (error, stdout, stderr) {
    var out = stdout.split('\r\n');
    var path = out[0].replace('HOMEDRIVE=', '') + out[1].replace('HOMEPATH=', '') + '\\Documents\\mdevp';
    init(path.replace(/\\/g, '/'));
});
