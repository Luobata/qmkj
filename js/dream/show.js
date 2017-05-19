define(function(require, exports, module) {
    var exports = {};
    var dom = {};
    var share = require('../valentine/share.js');
    var shareInit = require('./share-init.js');

    function domInit() {
        dom.index = $('#index');
        dom.body = $('body');
        dom.header = dom.index.find('.header');
        dom.lineWrap = dom.index.find('.line-wrap');
        dom.stepWrap = dom.index.find('.step-wrap');
        dom.button = dom.index.find('.button');
        dom.line = dom.index.find('.line');
        dom.logo = dom.index.find('.logo');

        dom.button.bind('tap', function () {
            share.init(dom.index);
        });
    }

    function lineInit() {
        var bodyHeight = dom.body.height();
        var headerHeight = dom.header.height() +
            parseFloat(dom.header.css('padding-bottom')) +
            parseFloat(dom.header.css('padding-top'));
        var stepHeight = dom.stepWrap.height();
        var buttonHeight = dom.button.height() + 
            parseFloat(dom.button.css('border-width')) * 2 +
            parseFloat(dom.button.css('margin-bottom')) +
            parseFloat(dom.button.css('margin-top'));
        var logoHeight = dom.logo.height() +
            parseFloat(dom.logo.css('margin-bottom'));
        var lineHeight = bodyHeight - (headerHeight + stepHeight + buttonHeight + logoHeight);
        dom.line.css('height', lineHeight > 100 ? lineHeight + 'px' : '100px');
    }

    var init = function () {
        domInit();
        lineInit();
        shareInit(true, 'http://h5.ruyiso.com/qmkj/index.php?r=dream/share/userId/' + window.userId);
    };

    init();
    module.exports = exports;
});