
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;">
<title></title>
<link rel="stylesheet" type="text/css" charset="utf-8" href="./js/lib/reset.css" />
<link rel="stylesheet" type="text/css" charset="utf-8" href="./css/global.css" />
<!-- <link rel="stylesheet" type="text/css" charset="utf-8" href="./css/index.css?v=201608337" /> -->
<link rel="stylesheet" type="text/css" charset="utf-8" href="./resource/index.css?v=201608337" />
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
            <div class="textWrap">
                <span class="text1 text"></span>
                <span class="text2 text"></span>
                <span class="text3 text"></span>
                <span class="text4 text"></span>
                <span class="text5 text"></span>
            </div>
            <span class="people">
            </span>
            <span class="testButton">测一测</span>
        </div>
        <div class="second">
            <div class="form">
                <div class="column">
                    <span class="text">我叫</span>
                    <span class="input">
                        <input type="text" name="" class="inputContent myName">
                    </span>
                </div>
                <div class="column">
                    <span class="text">出生地</span>
                    <span class="input">
                        <span class="address">
                            <select id="" name="" node-type="province" class="inputContentSelect province myProvince">
                                <option value="1">北京</option>
                            </select>
                            <span class="addressText">省</span>
                        </span>
                        <span class="address">
                            <select id="" name="" node-type="city" class="inputContentSelect city myCity">
                                <option value="1">北京</option>
                            </select>
                            <span class="addressText">市</span>
                        </span>
                    </span>
                </div>
                <div class="column">
                    <span class="text">TA叫</span>
                    <span class="input">
                        <input type="text" name="" class="inputContent taName">
                    </span>
                </div>
                <div class="column">
                    <span class="text">出生地</span>
                    <span class="input">
                        <span class="address">
                            <select id="" name="" node-type="province" class="inputContentSelect province taProvince">
                                <option value="1">北京</option>
                            </select>
                            <span class="addressText">省</span>
                        </span>
                        <span class="address">
                            <select id="" name="" node-type="city" class="inputContentSelect city taCity">
                                <option value="1">北京</option>
                            </select>
                            <span class="addressText">市</span>
                        </span>
                    </span>
                </div>
                <div class="column">
                    <span class="text">我们相遇在</span>
                    <span class="input">
                        <span class="address">
                            <select id="" name="" node-type="province" class="inputContentSelect province meetProvince">
                                <option value="1">北京</option>
                            </select>
                            <span class="addressText">省</span>
                        </span>
                        <span class="address">
                            <select id="" name="" node-type="city" class="inputContentSelect city meetCity">
                                <option value="1">北京</option>
                            </select>
                            <span class="addressText">市</span>
                        </span>
                    </span>
                </div>
            </div>
            <span class="testButton">测一测</span>
        </div>
        <div class="third">
            <div class="textWrap">
                <div class="text"><span class="myName"></span>和<span class="taName"></span></div>
                <div class="text">经历了<span class="distance"></span>公里</div>
                <div class="text">终于在一起</div>
            </div>
            <div class="shareWrap">
                <div class="again">
                    <span>
                        再测一次
                    </span>
                </div>
                <div class="share">
                    <span>分享到朋友圈</span>
                </div>
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
    var sign = JSON.parse(signStr);

    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: sign.appId, // 必填，公众号的唯一标识
        timestamp: sign.timestamp, // 必填，生成签名的时间戳
        nonceStr: sign.nonceStr, // 必填，生成签名的随机串
        signature: sign.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        var version = 201608334;
        seajs.config({
            charset: 'utf-8',
            timeout: 20000,
            debug: 2
        });
        seajs.use([
            './js/valentine/index.js?v=201608342'
        ]);
    });
</script>
</body>
</html>
