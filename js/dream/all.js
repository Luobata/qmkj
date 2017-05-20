define(function(require, exports, module) {
    var exports = {};
    var dom = {};
    var shareInit = require('./share-init.js');
    var dataTpl = require('./data.tpl.js');
    var isAjax = false;
    var end = false;
    var offset = 1;

    function domInit() {
        dom.index = $('#index');
        dom.button = dom.index.find('.button');
        dom.inner = dom.index.find('.step-wrap');
        dom.contents = dom.index.find('.contents');
        dom.loading = dom.index.find('.loading');
    }

    function getData(fn) {
        var data = {
            offset: offset
        };
        $.ajax({
            url: './index.php?r=dream/List',
            type: 'GET',
            data: data,
            dataType: 'json',
            success: function (data) {
                fn(data);
            }
        });
    }

    function eventBind() {
        dom.button.bind('tap', function () {
            var url = './index.php?r=dream';
            // url += '/code/1/openId/1';
            window.location.href = url;
        });
        dom.contents.bind('scroll', function () {
            var scrollTop = dom.contents.scrollTop();
            var height = dom.inner.height() - dom.contents.height();
            var margin = height - scrollTop;
            if (!isAjax && margin < 20 && !end) {
                isAjax = true;
                dom.loading.css('display', 'inline-block');
                getData(function (data) {
                    isAjax = false;
                    dom.loading.hide();
                    if (data.code === 200) {
                        if (data.data.length < 10) {
                            end = true;
                        }
                        dom.inner.append(dataTpl(data.data));
                        offset++;
                    }
                });
            }
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
