window.changyan.api.ready(function (api) {
    var $ = api.util.jquery;

        // 解决第三方cookie问题
        require('./third-cookie.js');
        // 加入reset样式
        require('./changyan-mobile-reset-v3.css');

        // 加入transit组件
        require('./jquery-transit.js');
        // 加入tap事件
        require('./jquery-tap.js');

        // 加入dialog组件
        require('./dialog.css');
        api.util.dialog = require('./dialog.js');

        api.util.toast = require('./toast.js');

        api.util.suffix = require('./suffix.js');

    var $$emoji = require('./emoji.js'),
        $$face = require('./mobile-face.js');
        api.util.emoji = $$emoji;
        api.util.face = $$face;

        api.util.preview = require('./picPreview.js');

        api.util.formatContent = function (content) {
            var fnDecode = function (s) {
                return s.replace(/<|%3C/gi, "&lt;").replace(/>|%3E/gi, "&gt;").replace(/"|%22/g, "&quot;").replace(/&amp;/g, "&").replace(/&quot;/g, '').replace(/\n/g, '</br>');
            }
            return $$face($$emoji(fnDecode(content)));
        }

        // 添加meta标签
        var head = document.getElementsByTagName('head')[0];
        var meta = document.getElementsByName('viewport')[0];
        if(!meta){
            meta = document.createElement('meta');
            meta.setAttribute('name','viewport');
            meta.setAttribute('content','initial-scale=1.0,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0,width=device-width');
            head.appendChild(meta);
        }

        // 初始化html
        $('#SOHUCS').html('<div id="SOHU_MAIN" class="reset-g"></div>');
        $SOHU_MAIN = $('#SOHU_MAIN');

        // 加入字体大小
        var width = document.body.clientWidth;
        $SOHU_MAIN.css('font-size', width * 12 / 320 + 'px');

        // 加入调试字体样式
        var ua = window.navigator.userAgent;
        var isMobile = ua.match(/(Android|iPhone|iPad)/);
        if (isMobile) {
            $SOHU_MAIN.css('font-family', '"Helvetica"');
        } else {
            $SOHU_MAIN.css('font-family', '"黑体-简", "Helvetica"');
        }

        // 根据参数加载皮肤

});
