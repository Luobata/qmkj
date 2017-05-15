define(function(require, exports, module) {
    var exports = {};
    var dom = {};
    var share = require('../valentine/share.js');

    function domInit() {
        dom.index = $('#index');
        dom.body = $('body');
        dom.header = dom.index.find('.header');
        dom.lineWrap = dom.index.find('.line-wrap');
        dom.stepWrap = dom.index.find('.step-wrap');
        dom.button = dom.index.find('.button');
        dom.line = dom.index.find('.line');

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
        var lineHeight = bodyHeight - (headerHeight + stepHeight + buttonHeight);
        dom.line.css('height', lineHeight > 100 ? lineHeight + 'px' : '100px');
    }

    var init = function () {
        domInit();
        lineInit();
    };

    init();
    module.exports = exports;
});