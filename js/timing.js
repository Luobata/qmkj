define(function (require, exports, module) {
    var dom = {};
    var exports = {};
    var isReading = false;
    var timer;
    var timeInit;
    var THI = 60 * 30;
    var FORTYFIVE = 60 * 45;
    var SIXTY = 60 * 60;
    var HUNDRED = 60 * 120;
    var HUNDRED = 60 * 60;
    var codeId = 0;

    var init = function () {
        navigator.vibrate = navigator.vibrate
            || navigator.webkitVibrate
            || navigator.mozVibrate
            || navigator.msVibrate;

        if (navigator.vibrate) {
            navigator.vibrate(1000);
        }
    };

    var domInit = function () {
        dom.index = $('.module-timing');
        dom.start = dom.index.find('div[node-type="start"]');
        dom.times = dom.index.find('div[node-type="times"]');
        dom.hours = dom.times.find('.time-hours');
        dom.mins = dom.times.find('.time-mins');
        dom.secs = dom.times.find('.time-secs');
        dom.gift = dom.index.find('div[node-type="gift-toast"]');
        dom.gifts = dom.index.find('.gifts');
        dom.giftA = dom.index.find('.gift-25');
        dom.giftB = dom.index.find('.gift-30');
        dom.giftC = dom.index.find('.gift-100');
        dom.giftD = dom.index.find('.gift-lifeme');
        dom.giftE = dom.index.find('.gift-pro5');
        dom.giftF = dom.index.find('.gift-ear');
        dom.noGift = dom.index.find('.no-gift');
        dom.giftSubmit = dom.index.find('.gift-submit');
        dom.giftLimit = dom.index.find('.gift-limit');
        dom.giftClose = dom.index.find('div[node-type="close"]');
        dom.readAgain = dom.index.find('img[node-type="reader-again"]');

        dom.submitButton = dom.index.find('div[node-type="gift-submit-button"]');
        dom.name = dom.index.find('div[node-type="gift-name"]');
        dom.tel = dom.index.find('div[node-type="gift-tel"]');

        dom.token = $('input[node-type="token"]');
    };

    var giftHide = function () {
        dom.gift.hide();
        dom.gifts.hide();
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
        dom.giftClose.on('tap', function () {
            giftHide();
            dom.index.addClass('out');
        });
        dom.readAgain.on('tap', function () {
            giftHide();
            dom.start.trigger('tap');
        });
        var beginTime = function () {
            timer = setInterval(function () {
                var hour = parseInt(dom.hours.text(), 10);
                var min = parseInt(dom.mins.text(), 10);
                var sec = parseInt(dom.secs.text(), 10);
                sec++;
                if (sec === 60) {
                    min++;
                    sec = 0
                }
                if (min === 60) {
                    hour++;
                    min = 0;
                }
                hour = (hour < 10) ? ('0' + hour) : hour;
                min = (min < 10) ? ('0' + min) : min;
                sec = (sec < 10) ? ('0' + sec) : sec;
                dom.hours.text(hour);
                dom.mins.text(min);
                dom.secs.text(sec);
            }, 1000);
        };
        var clearTime = function () {
            clearInterval(timer);
            timer = null;
        };
        var toggleStat = function (type, success) {
            $.ajax({
                cache: false,
                dataType: 'json',
                timeout: 30000,
                type: 'GET',
                url: 'index.php?r=reading/' + type,
                success: success,
                error: function (xhr) {
                }
            });
        };
        dom.start.on('tap', function (e) {
            var $this = $(this);
            var token = dom.token.data('id');
            if ($this.hasClass('over')) {
                clearTime();
                isReading = false;
                $(this).text('开始');
                $this.removeClass('over');
                toggleStat('stopReading&token=' + token + '&id=' + codeId, function (data) {
                    // TODO 发送请求，刷新总时间
                    timeInit(data.data.duration_time);
                    var time = new Date();
                    time = time.getHours() || 9;
                    dom.gift.show();
                    // data.data.duration_time = 60 * 121;
                    if (data.data.lottery_type === '1') {
                        dom.giftLimit.show();
                    } else if ((data.data.duration_time > HUNDRED) && (data.data.lottery_type === '3')) {
                        dom.giftD.show();
                    } else if ((data.data.duration_time > HUNDRED) && (data.data.lottery_type === '4')) {
                        dom.giftF.show();
                    } else if (data.data.duration_time > FORTYFIVE) {
                        dom.giftB.show();
                    } else if (data.data.duration_time > THI) {
                        dom.giftA.show();
                    } else {
                        dom.noGift.show();
                    }
                    // dom.index.addClass('out');
                });
            } else {
                if (isReading) return;
                $(this).text('结束');
                isReading = true;
                beginTime();
                $this.addClass('over');
                var token = dom.token.data('id');
                toggleStat('startReading&token=' + token, function (data) {
                    codeId = data.data.id;
                });
            }
        });
        dom.giftD.find('img').on('tap', function () {
            dom.giftD.hide();
            dom.giftSubmit.show();
        });
        dom.giftE.find('img').on('tap', function () {
            dom.giftE.hide();
            dom.giftSubmit.show();
        });
        dom.giftF.find('img').on('tap', function () {
            dom.giftF.hide();
            dom.giftSubmit.show();
        });
        dom.submitButton.on('tap', function () {
            var name = dom.name.val();
            var tel = dom.tel.val();
            $.ajax({
                cache: false,
                dataType: 'json',
                timeout: 30000,
                type: 'GET',
                url: 'index.php?r=reading/updateInfo&name=' + name + '&telephone=' + tel,
                success: function (data) {
                },
                error: function (xhr) {
                }
            });
            dom.giftClose.trigger('tap');
        });
        // document.addEventListener("visibilitychange", function() {
        //       console.log( document.visibilityState );
        //       dom.start.trigger('tap');
        // });
    };

    exports.init = function ($mod, time) {
        timeInit = time;
        if (dom.index) {
            dom.index.removeClass('out');
        } else {
            var time = require('./time-tpl.js?v=201608337');
            $mod.append(time);
            domInit();
            eventBind();
        }
        dom.start.trigger('tap');
    };

    module.exports = exports;
});
