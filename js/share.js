define(function (require, exports, module) {
    var dom = {};
    var exports = {};

    var init = function () {
    };

    var domInit = function () {
        dom.index = $('.module-share');
    };

    var eventBind = function () {
        var eventData = {};
        dom.index.on('touchstart', function (e) {
            var event = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
            eventData.startY = event.pageY;
        });
        dom.index.on('touchmove', function (e) {
            e.stopPropagation();
            var event = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
            var scorll = dom.index.scrollTop(),
                scrollHeight = dom.index[0].scrollHeight - dom.index.innerHeight();
            var startY = eventData.startY;
            if (scorll <= 10 && (startY - event.pageY) <= 0) {
                e.preventDefault();
                return false;
            }

            if (scorll >= scrollHeight && (startY - event.pageY) >= 0) {
                e.preventDefault();
                return false;
            }
        });
        dom.index.on('tap', function () {
            dom.index.addClass('out');
        });
    };

    exports.init = function ($mod) {
        if (dom.index) {
            dom.index.removeClass('out');
        } else {
            var share = require('./share.tpl.js');
            $mod.append(share);
            domInit();
            eventBind();
        }
    };

    module.exports = exports;
});
