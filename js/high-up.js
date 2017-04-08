define(function (require, exports, module) {
    var dom = {};
    var exports = {};

    var domInit = function () {
        dom.index = $('.module-high-up');
        dom.center = $('.module-high-up');
        dom.back = dom.index.find('div[node-type="return-back"]');
        dom.know = dom.index.find('span[node-type="high-up-know"]');
        dom.join = dom.index.find('span[node-type="high-up-join-now"]');
    };

    var eventBind = function ($know) {
        var eventData = {};
        dom.center.on('touchstart', function (e) {
            var event = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
            eventData.startY = event.pageY;
        });
        dom.center.on('touchmove', function (e) {
            e.stopPropagation();
            var event = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
            var scorll = dom.center.scrollTop(),
                scrollHeight = dom.center[0].scrollHeight - dom.center.innerHeight();
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
        dom.join.on('tap', function () {
            dom.back.trigger('tap');
            $know.trigger('tap');
        });
    };

    exports.init = function ($mod, $know) {
        if (dom.index) {
            dom.index.removeClass('out');
        } else {
            var high = require('./high-up-tpl.js');
            $mod.append(high);
            domInit();
            eventBind($know);
        }
    };

    module.exports = exports;
});
