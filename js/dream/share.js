define(function(require, exports, module) {
    var exports = {};
    var dom = {};

    function domInit() {
        dom.index = $('#index');
        dom.button = dom.index.find('.button');
    }

    function eventBind() {
        dom.button.bind('tap', function () {
            var url = './index.php?r=dream/index/userId/' + window.userId;
            url += '/code/1/openId/1';
            window.location.href = url;
        });
    }

    var init = function () {
        domInit();
        eventBind();
    };

    init();
    module.exports = exports;
});
