define(function(require, exports, module) {
    module.exports = function (type, url) {
        var title = '不忘初心•梦想集结号';
        var desc = '和' + window.userInfo.nickname + '一起记录自己最初的梦想，不忘初心从心出发';
        var imgUrl = 'http://h5.ruyiso.com/qmkj/images/dream/icon.jpg';
        var link = url;
        var success = function () {
            //log('Share');
            _hmt.push(['_trackEvent', 'share', 'share']);
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
    }
});