define(function(require, exports, module) {
    var exports = {};
    var dom = {};

    var domInit = function () {
        dom.index = $('#index');
        dom.indexPage = dom.index.find('div[node-type="index"]');
        dom.province = dom.index.find('select[node-type="province"]');
        dom.city = dom.index.find('select[node-type="city"]');
        dom.school = dom.index.find('select[node-type="school"]');
        dom.wantBook = dom.index.find('input[node-type="want-book"]');
        dom.wechat = dom.index.find('input[node-type="wechat"]');
        dom.inviteFriends = dom.index.find('div[node-type="invite-friends"]');
        dom.invite = dom.index.find('div[node-type="invite"]');
        dom.ranks = dom.index.find('div[node-type="rank-school-names"]');
        dom.highUp = dom.index.find('div[node-type="high-up-more"]');
        dom.books = dom.index.find('div[node-type="books-more"]');
        dom.submit = dom.index.find('div[node-type="submit"]');
        dom.start = dom.index.find('div[node-type="start"]');

        dom.know = dom.index.find('span[node-type="high-up-know"]');
        dom.join = dom.index.find('span[node-type="high-up-join-now"]');
        dom.context = dom.index.find('div[node-type="join-context"]');
        dom.contextInput = dom.index.find('div[node-type="context-submit"]');
        dom.contextStart = dom.index.find('div[node-type="context-start"]');

        // 学校排行渲染
        dom.mySchoolRank = dom.index.find('span[node-type="my-school-rank"]');

        // 分享相关
        dom.shareLink = $('input[node-type="share-url"]');
        dom.schoolName = $('input[node-type="share-school"]');
        dom.schoolRank = $('input[node-type="share-school-rank"]');

        // 总时间相关url
        dom.timeWrap = dom.index.find('div[node-type="total-time-wrap"]');
        dom.time = dom.index.find('input[node-type="total-time"]');
    };

    var eventBind = function () {
        dom.highUp.on('tap', function () {
            require('./high-up.js').init(dom.index, dom.join);
        });
        dom.books.on('tap', function () {
            require('./reader.js').init(dom.index);
        });
        dom.submit.on('tap', function () {
            var province = dom.province.find('option:selected').val();
            var city = dom.city.find('option:selected').val();
            var school = dom.school.find('option:selected').val();
            var wantBook = dom.wantBook.val() || '';
            var wechat = dom.wechat.val() || '';
            $.ajax({
                cache: false,
                dataType: 'json',
                timeout: 30000,
                type: 'GET',
                url: './index.php',
                data: {
                    r: 'reading/signup',
                    province: province,
                    city: city,
                    school: school,
                    wechat: wechat,
                    reading_book: wantBook
                },
                success: function (data) {
                    dom.contextInput.hide();
                    dom.contextStart.show();
                },
                error: function (xhr) {
                }
            });
        });
        dom.start.on('tap', function () {
            require('./timing.js?v=201608339').init(dom.index, timeInit);
        });
        dom.invite.on('tap', function () {
            shareInit(false);
            require('./share.js').init(dom.index);
        });
        dom.inviteFriends.on('tap', function () {
            shareInit(true);
            require('./share.js').init(dom.index);
        });

        dom.join.on('tap', function () {
            var offsetY = dom.context.offset().top;
            window.scrollTo(0, offsetY);
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
        var formateRank = function (data) {
            var schools = dom.ranks.find('.rank-schools');
            var border = dom.ranks.find('.rank-school-border');
            var names = schools.find('.rank-school');
            var progress = schools.find('.rank-school-progress');
            var text = schools.find('.text');
            var schoolData = data.schoolRankingList;
            var baseWidth = progress.eq(0).width();
            var total = 0;
            var i;
            schoolData.sort(function (a, b) {
                var fir = parseInt(a.total_reading_time, 10);
                var sec = parseInt(b.total_reading_time, 10);
                return sec - fir;
            });
            var max = parseInt(schoolData[0].total_reading_time, 10);
            for (i = 0; i < schoolData.length; i++) {
                names.eq(i).text(schoolData[i].school);
                text.eq(i).text(schoolData[i].total_reading_time);
                total += parseInt(schoolData[i].total_reading_time);
                var hour = parseInt(schoolData[i].total_reading_time, 10) || 0;
                var wid = parseInt((hour / max * baseWidth), 10) + 'px';
                progress.eq(i).width(wid);
            }
            for (i = 0; i < schoolData.length; i++) {
                var hour = parseInt(schoolData[i].total_reading_time, 10) || 0;
                var wid = parseInt((hour / total * baseWidth), 10) + 'px';
                //progress.eq(i).width(wid);
            }
            if (i < 10) {
                // 删除多余的节点
                for (; i < schools.length; i++) {
                    schools.eq(i).remove();
                    border.eq(i).remove();
                }
            }
        };
        $.ajax({
            cache: false,
            dataType: 'json',
            timeout: 30000,
            type: 'GET',
            url: 'index.php?r=reading/getRankingList',
            data: {
            },
            success: function (data) {
                // TODO 修改排名列表
                data = data.data;
                console.log(data);
                dom.mySchoolRank.text('第' + data.mySchoolRanking + '名');
                formateRank(data);
            },
            error: function (xhr) {
            }
        });
    };

    var shareInit = function (type) {
        var total = parseInt(dom.time.data('time'), 10);
        var school = dom.schoolName.data('id');
        var schoolRank = dom.schoolRank.data('id');
        var title;
        var desc;
        if (type) {
            if (total) {
                total = parseInt(total / 60, 10) || 0;
                title = '我已坚持阅读' + total + '分钟，不读就出局，敢来吗？';
                desc = '2016京东图书开学季，邀你“不读就出局”阅读打卡大挑战，用阅读时间换取阅读鼓励大礼！';
            } else {
                title = '我已坚持阅读0分钟，不读就出局，敢来吗？';
                desc = '2016京东图书开学季，邀你“不读就出局”阅读打卡大挑战，用阅读时间换取阅读鼓励大礼！';
            }
        } else {
            if (total) {
                total = parseInt(total / 60, 10) || 0;
                title = school + '现在排名' + schoolRank + '，快来助一臂之力！';
                desc = '2016京东图书开学季，不读就出局阅读打卡大挑战，用你的阅读时间为学校PK上榜。';
            } else {
                title = '不读就出局，用阅读为高校上榜';
                desc = '2016京东图书开学季，不读就出局阅读打卡大挑战。拒绝大脑被掏空，为自己读书，为学校PK上榜。';
            }
        }
        var link = window.location.origin + dom.shareLink.val();
        var imgUrl = dom.shareLink.data('img');
        var imgUrl = 'http://h5.batorange.com/jingdong/reading/server/portal/images/icon.jpg';
        var success = function () {
            $.ajax({
                cache: false,
                dataType: 'json',
                timeout: 30000,
                type: 'GET',
                url: 'index.php?r=reading/saveEvent&location=index&event=share',
                success: function (data) {
                },
                error: function (xhr) {
                }
            });
        };
        wx.onMenuShareTimeline({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: success,
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: success,
            cancel: function () {
            }
        });
    };

    var provinceInit = function () {
        var getInfo = function (type, data, $mod, fn) {
            $.ajax({
                cache: false,
                dataType: 'json',
                timeout: 30000,
                type: 'GET',
                url: 'index.php?r=address/' + type,
                data: data,
                success: function (data) {
                    data = data.data
                    var i;
                    var option;
                    for (i = 0; i < data.length; i++) {
                        option += '<option value="' + data[i] + '">' + data[i] + '</option>';
                    }
                    $mod.children().remove();
                    $mod.append(option);
                    fn && fn();
                },
                error: function (xhr) {
                }
            });
        };
        getInfo('getProvinces', '', dom.province, function () {
            dom.province.trigger('change');
        });
        // 城市联动
        dom.province.on('change', function () {
            $this = $(this);
            var value = $this.children('option:selected').val();
            getInfo('getCities', {province: value}, dom.city, function () {
                dom.city.trigger('change');
            });
        });
        dom.city.on('change', function () {
            $this = $(this);
            var value = $this.children('option:selected').val();
            getInfo('getSchools', {
                province: dom.province.find('option:selected').val(),
                city: value
            }, dom.school);
        });
    };

    var timeInit = function (sec) {
        // 计算原时间
        var hourF = dom.timeWrap.find('.time-hour-1');
        var hourS = dom.timeWrap.find('.time-hour-2');
        var minF = dom.timeWrap.find('.time-min-1');
        var minS = dom.timeWrap.find('.time-min-2');
        var secF = dom.timeWrap.find('.time-sec-1');
        var secS = dom.timeWrap.find('.time-sec-2');

        var hourTimeF = parseInt(hourF.html(), 10);
        var hourTimeS = parseInt(hourS.html(), 10);
        var minTimeF = parseInt(minF.html(), 10);
        var minTimeS = parseInt(minS.html(), 10);
        var secTimeF = parseInt(secF.html(), 10);
        var secTimeS = parseInt(secS.html(), 10);

        sec += hourTimeF * 3600 *10 + hourTimeS * 3600 + minTimeF * 60 * 10 + minTimeS * 60 + secTimeF * 10 + secTimeS;

        var hour = parseInt(sec / 3600, 10);
        var hourFirNum = parseInt(hour / 10, 10) || 0;
        var hourSecNum = hour % 10;
        sec = sec % 3600;
        var min = parseInt(sec / 60, 10) || 0;
        var minFirNum = parseInt(min / 10, 10);
        var minSecNum = min % 10;
        sec = sec % 60;
        var secFirNum = parseInt(sec / 10, 10) || 0;
        var secSecNum = sec % 10;

        hourF.html(hourFirNum);
        hourS.html(hourSecNum);
        minF.html(minFirNum);
        minS.html(minSecNum);
        secF.html(secFirNum);
        secS.html(secSecNum);
    };

    var init = function () {
        enter();
        domInit();
        eventBind();
        timeInit(dom.time.data('time'));
        provinceInit();
        dataInit();
        shareInit(true);
    };

    init();

    module.exports = exports;
});
