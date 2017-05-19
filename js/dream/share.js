define(function(require, exports, module) {
    var exports = {};
    var dom = {};
    var shareInit = require('./share-init.js');

    function domInit() {
        dom.index = $('#index');
        dom.button = dom.index.find('.button');
    }

    function eventBind() {
        dom.button.bind('tap', function () {
            var url = './index.php?r=dream';
            // url += '/code/1/openId/1';
            window.location.href = url;
        });
    }

    var init = function () {
        domInit();
        eventBind();
        shareInit(true, 'http://h5.ruyiso.com/qmkj/index.php?r=dream/share/userId/' + window.userId);
    };

    init();
    module.exports = exports;
});
