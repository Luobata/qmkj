<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,height=device-height;inital-scale=1.0,maximum-scale=1.0,user-scalable=no;">
<title>不忘初心•梦想集结号</title>
<link rel="stylesheet" type="text/css" charset="utf-8" href="./js/lib/reset.css" />
<link rel="stylesheet" type="text/css" charset="utf-8" href="./css/global.css" />
<!-- <link rel="stylesheet" type="text/css" charset="utf-8" href="./css/dream.css?v=201608337" /> -->
<link rel="stylesheet" type="text/css" charset="utf-8" href="./resource/dream.css?v=201608337" />
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?4101765acbaca6291e5cfcbeaa89f81a";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</head>
<body>
<script type="text/javascript">
    (function () {
        var width = document.body.clientWidth;
        var rate = parseInt(width * 12 / 320, 10);
        window.rate = rate / 12;
        //var rate = width * 12 / 320;
        document.getElementsByTagName('html')[0].style['font-size'] =  rate + 'px';
    }());
</script>
    <div id="index">
        <div class="first">
            <!-- <div class="header">在此刻认证记录我的梦想，写下后不再更改，并从此为它拼搏！
            </div> -->
            <div class="textarea-wrap">
                <textarea class="text" row="6" maxlength="20" placeholder="此处输入你的梦想，您可输入20字。"></textarea>
            </div>
            <div class="button">确认梦想</div>
            <div class="logo"></div>
        </div>
        <div class="tip alert">
            <div class="tip-content">
                <span class="tip-text">请填写你的梦想</span>
                <span class="ok-button">确定</span>
            </div>
        </div>
        <div class="confirm">
            <div class="tip-content">
                <span class="tip-text">这是一个慎重的决定！请确认你的梦想是否为：xxx，确认后不可修改</span>
                <span class="ok-button submit">我已确认</span>
                <span class="ok-button back">返回修改</span>
            </div>
        </div>
    </div>



<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=7c63439b906f40091eaa6cbdf8efde8a&plugin=AMap.DistrictSearch"></script>
<script type="text/javascript" src="./js/lib/pixi.min.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/jquery.min.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/jquery-tap.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/template.js"></script>
<script type="text/javascript" charset="utf-8" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/sea.js"></script>
<script type="text/javascript">
    var signStr = '<?php echo($signPackage); ?>';
    var userInfo = '<?php echo($user); ?>';
    var sign = JSON.parse(signStr);
    window.userInfo = JSON.parse(userInfo);
    window.userId = '<?php echo($userId)?>';
    window.taskId = '<?php echo($taskId)?>';

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: sign.appId, // 必填，公众号的唯一标识
        timestamp: sign.timestamp, // 必填，生成签名的时间戳
        nonceStr: sign.nonceStr, // 必填，生成签名的随机串
        signature: sign.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        var version = 2016083348;
        seajs.config({
            charset: 'utf-8',
            timeout: 20000,
            debug: 2
        });
        seajs.use([
            './js/dream/index.js?v=' + version
        ]);
    });
</script>
<!-- <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1261805651'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1261805651%26online%3D1' type='text/javascript'%3E%3C/script%3E"));</script> -->
</body>
</html>
