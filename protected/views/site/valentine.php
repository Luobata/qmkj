
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;">
<title></title>
<link rel="stylesheet" type="text/css" charset="utf-8" href="./js/lib/reset.css" />
<link rel="stylesheet" type="text/css" charset="utf-8" href="./css/global.css" />
<link rel="stylesheet" type="text/css" charset="utf-8" href="./css/index.css?v=201608337" />
</head>
<body>
<script type="text/javascript">
    (function () {
        var width = document.body.clientWidth;
        var rate = parseInt(width * 12 / 320, 10);
        //var rate = width * 12 / 320;
        document.getElementsByTagName('html')[0].style['font-size'] =  rate + 'px';
    }());
</script>




<script type="text/javascript" charset="utf-8" src="./js/lib/jquery.min.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/jquery-tap.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/template.js"></script>
<script type="text/javascript" charset="utf-8" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/sea.js"></script>
<script type="text/javascript">
    // var signStr = '<?php echo($signPackage); ?>';
    // var sign = JSON.parse(signStr);
    // wx.config({
    //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: sign.appId, // 必填，公众号的唯一标识
    //     timestamp: sign.timestamp, // 必填，生成签名的时间戳
    //     nonceStr: sign.nonceStr, // 必填，生成签名的随机串
    //     signature: sign.signature,// 必填，签名，见附录1
    //     jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // });
    // wx.ready(function () {
        var version = 201608334;
        seajs.config({
            charset: 'utf-8',
            timeout: 20000,
            debug: 2
        });
        seajs.use([
            './js/reading/index.js?v=201608341'
        ]);
    // })
</script>
</body>
</html>
