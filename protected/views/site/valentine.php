
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
    <div id="index">
        <div class="first">
            <span class="people">
            </span>
            <span class="testButton">测一测</span>
        </div>
        <div class="second">
            <div class="form">
                <div class="column">
                    <span class="text">我叫</span>
                    <span class="input">
                        <input type="text" name="" class="inputContent">
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
                        <input type="text" name="" class="inputContent">
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
    </div>



<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=7c63439b906f40091eaa6cbdf8efde8a&plugin=AMap.DistrictSearch"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/jquery.min.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/jquery-tap.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/template.js"></script>
<script type="text/javascript" charset="utf-8" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/lib/sea.js"></script>
<script type="text/javascript">

    // wx.ready(function () {
        var version = 201608334;
        seajs.config({
            charset: 'utf-8',
            timeout: 20000,
            debug: 2
        });
        seajs.use([
            './js/valentine/index.js?v=201608341'
        ]);
    // })
</script>
</body>
</html>
