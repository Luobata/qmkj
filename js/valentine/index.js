define(function(require, exports, module) {
    var exports = {};
    var dom = {};
    var myPosition;
    var taPosition;
    var meetPosition;
    var distance = 0;
    var canvas = require('./canvas.js');
    var log = require('./log.js');

    var domInit = function () {
        dom.index = $('#index');
        dom.first = dom.index.find('.first');
        dom.second = dom.index.find('.second');
        dom.test = dom.first.find('.testButton');
        dom.testS = dom.second.find('.testButton');
        dom.provinces = dom.second.find('.province');
        dom.myCity = dom.second.find('.myCity');
        dom.taCity = dom.second.find('.taCity');
        dom.meetCity = dom.second.find('.meetCity');
        dom.myProvince = dom.second.find('.myProvince');
        dom.taProvince = dom.second.find('.taProvince');
        dom.meetProvince = dom.second.find('.meetProvince');
    };

    var eventBind = function () {
        dom.test.bind('tap', function () {
            dom.first.fadeOut(500);
            log(2);
        });
        dom.testS.bind('tap', function () {
            if (!myPosition || !taPosition || !meetPosition) return;
            var lnglat = new AMap.LngLat(meetPosition.lng, meetPosition.lat);
            var my = lnglat.distance([myPosition.lng, myPosition.lat]);
            var ta = lnglat.distance([taPosition.lng, taPosition.lat]);
            distance  = ((my + ta) / 1000).toFixed(0);
            dom.second.fadeOut(500);
            canvas(dom.index);
            log(3);
        });
    };

    var enter = function () {
        var $index = $('#index');
        var ua = window.navigator.userAgent;
        var isMobile = ua.match(/(Android|iPhone|iPad)/);
        if (isMobile) {
            $index.css('font-family', '"Helvetica"');
            $index.css('font-family', '"黑体-简"');
        } else {
            $index.css('font-family', '"Helvetica", "黑体-简"');
        }
        var width = document.body.clientWidth;
        var rate = parseInt(width * 12 / 320, 10);
        //var rate = width * 12 / 320;
        $('html').css('font-size', rate + 'px');
    };

    var dataInit = function () {
    };

    var shareInit = function (type) {
    };

    var provinceInit = function () {
        var opts = {
            subdistrict: 1,   //返回下一级行政区
            level: 'city',
            showbiz:false  //查询行政级别为 市
        };
        var district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
        district.search('中国', function (status, result) {
            if (status === 'complete') {
                //getData(result.districtList);
                var option;
                var i;
                result.districtList[0].districtList.forEach(function (item) {
                    option += '<option value="' + item.adcode+ '">' + item.name + '</option>';
                });
                dom.provinces.children().remove();
                dom.provinces.append(option);
                for (i = 0; i < dom.provinces.length; i++) {
                    dom.provinces[i].options[0].selected = true;
                }
                dom.provinces.change();
            }
        });
        // 城市联动
        dom.provinces.on('change', function (dom) {
            $this = $(this);
            var value = $this.children('option:selected').val();
            var city = $this.parents('.input').find('.city');
            district.search(value, function (status, result) {
                if (status === 'complete') {
                    var option;
                    result.districtList[0].districtList.forEach(function (item) {
                        option += '<option value="' + item.adcode+ '" position="' + item.center + '">' + item.name + '</option>';
                    });
                    city.children().remove();
                    city.append(option);
                    city.get(0).options[0].selected = true;
                    city.change();
                }
            });
        });
        dom.myCity.on('change', function () {
            $this = $(this);
            var position = $this.children('option:selected').attr('position').split(',');
            myPosition = {
                lng: position[0],
                lat: position[1]
            };
        });
        dom.taCity.on('change', function () {
            $this = $(this);
            var position = $this.children('option:selected').attr('position').split(',');
            taPosition = {
                lng: position[0],
                lat: position[1]
            };
        });
        dom.meetCity.on('change', function () {
            $this = $(this);
            var position = $this.children('option:selected').attr('position').split(',');
            meetPosition = {
                lng: position[0],
                lat: position[1]
            };
        });
    };


    var init = function () {
        log(1);
        // enter();
        domInit();
        eventBind();
        provinceInit();
        dataInit();
        shareInit(true);
        canvas(dom.index);
    };

    init();

    module.exports = exports;
});
