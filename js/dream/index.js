define(function(require, exports, module) {
    var exports = {};
    var dom = {};

    function tip(txt) {
        dom.tipC.text(txt);
        dom.tip.fadeIn(100);
    };

    function sendDream(txt) {
        var data = {
            openId: window.userInfo.openId,
            nickname: window.userInfo.nickname || '罗比塔',
            headimgurl: window.userInfo.headimgurl || '123',
            dream: txt,
            userId: window.userInfo.userId || window.userInfo.openId,
            startTime: new Date().getTime()
        };

        $.ajax({
            url: './index.php?r=dream/add',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.code !== 200) {
                    tip(data.msg);
                }
            }
        });
    }

    function domInit() {
        dom.index = $('#index');
        dom.body = $('body');
        dom.textArea = dom.index.find('.text');
        dom.button = dom.index.find('.button');
        dom.tip = dom.index.find('.tip');
        dom.tipOk = dom.index.find('.ok-button');
        dom.tipC = dom.index.find('.tip-text');
    }

    function eventBind() {
        dom.button.bind('tap', function () {
            var txt = dom.textArea.val();
            if (!txt.trim().length) {
                tip('请输入你的梦想');
                return;
            }

            sendDream(txt);
        });
        dom.tip.bind('tap', function (e) {
            var item = $(e.target);
            if (!item.hasClass('tip-text')) {
                dom.tip.fadeOut(200);
            }
        });
    }

    var init = function () {
        domInit();
        eventBind();
    };

    init();
    module.exports = exports;
});
