define(function(require, exports, module) {
    module.exports = function (type, url) {
        var title = '不忘初心•梦想集结号';
        var desc = '不忘初心•梦想集结号';
        var imgUrl = 'http://h5.ruyiso.com/qmkj/images/icon.png';
        var link = url;
        var success = function () {
            //log('Share');
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