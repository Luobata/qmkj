define(function (require, exports, module) {
    var dom = {};
    var exports = {};

    var domInit = function () {
        dom.index = $('.module-reader');
        dom.back = dom.index.find('div[node-type="return-back"]');
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
        dom.back.on('tap', function (e) {
            dom.index.addClass('out');
        });
    };

    exports.init = function ($mod) {
        if (dom.index) {
            dom.index.removeClass('out');
        } else {
            var books = require('./reader-tpl.js');
            $mod.append(books);
            domInit();
            eventBind();
        }
    };

    module.exports = exports;
});
