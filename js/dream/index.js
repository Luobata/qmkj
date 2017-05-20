define(function(require, exports, module) {
    var exports = {};
    var dom = {};
    var shareInit = require('./share-init.js');

    function tip(txt) {
        dom.tipC.text(txt);
        dom.tip.fadeIn(100);
    };

    function confirm(txt) {
        var text = '这是一个慎重的决定！请确认你的梦想是否为：' + txt + '，确认后不可修改';
        dom.confirm.css('display', 'flex');
        dom.confirmC.text(text);
        dom.confirm.fadeIn(100);
    }

    function sendDream(txt) {
        var data = {
            openId: window.userInfo.openId,
            nickname: window.userInfo.nickname || '匿名网友',
            headimgurl: window.userInfo.headimgurl || 'http://h5.ruyiso.com/qmkj/images/heart.png',
            dream: txt,
            userId: window.userId || window.userInfo.openId,
            startTime: new Date().getTime(),
            sex: window.userInfo.sex || 0
        };

        $.ajax({
            url: './index.php?r=dream/add',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.code !== 200) {
                    tip(data.msg);
                    window.location.href = "./index.php?r=dream/index/userId/" + data.data.userId;
                } else {
                    window.location.href = "./index.php?r=dream/index/userId/" + window.userInfo.openId
                }
            }
        });
    }

    function domInit() {
        dom.index = $('#index');
        dom.body = $('body');
        dom.textArea = dom.index.find('.text');
        dom.button = dom.index.find('.button');
        dom.tip = dom.index.find('.alert');
        dom.tipOk = dom.tip.find('.ok-button');
        dom.tipC = dom.tip.find('.tip-text');
        dom.confirm = dom.index.find('.confirm');
        dom.confirmC = dom.confirm.find('.tip-text')
        dom.submit = dom.confirm.find('.submit');
        dom.back = dom.confirm.find('.back');
    }

    function eventBind() {
        dom.button.bind('tap', function () {
            var txt = dom.textArea.val();
            if (!txt.trim().length) {
                tip('请输入你的梦想');
                return;
            } else {
                confirm(txt);
            }

            // sendDream(txt);
        });
        dom.tip.bind('tap', function (e) {
            var item = $(e.target);
            if (!item.hasClass('tip-text')) {
                dom.tip.fadeOut(200);
            }
        });
        dom.back.bind('tap', function (e) {
            // var item = $(e.target);
            // if (!item.hasClass('tip-text')) {
                dom.confirm.fadeOut(200);
            // }
        });
        dom.submit.bind('tap', function (e) {
            var txt = dom.textArea.val();
            sendDream(txt);
        });
    }
    function shareInits (type) {
        var userId = window.userId;
        var url;
        if (userId) {
            url = 'http://h5.ruyiso.com/qmkj/index.php?r=dream/share/userId/' + window.userId;
        } else {
            url = 'http://h5.ruyiso.com/qmkj/index.php?r=dream';
        }
        shareInit(true, url);
    };

    var init = function () {
        domInit();
        eventBind();
        shareInits();
    };

    init();
    module.exports = exports;
});
