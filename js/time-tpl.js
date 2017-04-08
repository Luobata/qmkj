define(function (require, exports, module) {
    var tpl = '' +
    '   <div class="module-timing">' +
    '       <div class="mask"></div>' +
    '       <div class="time-wrap">' +
    '           <div class="times" node-type="times">' +
    '               <span class="time-hours">00</span>:<span class="time-mins">00</span>:<span class="time-secs">00</span>' +
    '           </div>' +
    '           <div class="time-border"></div>' +
    '           <div class="time-text">现在是“读书模式”</div>' +
    '           <div class="time-text-2">请勿触碰手机</div>' +
    '           <div class="time-start" node-type="start">开始</div>' +
    '       </div>' +
    '       <div class="toast" node-type="gift-toast">' +
    '           <div class="mask"></div>' +
    '           <div class="toast-wrapper">' +
    '               <div class="close" node-type="close"></div>' +
    '               <div class="gift-wrapper">' +
    '                   <div class="gift">' +
    '                       <img src="./images/50-gift.png" alt="" class="gift-50" />' +
    '                   </div>' +
    '                   <div class="no-gift gifts">' +
    '                       <div class="gift-text">很遗憾，</div>' +
    '                       <div class="gift-text">没有获得奖品</div>' +
    '                       <a href="javascript:void(0);"><img src="./images/no-gift.png" alt="" node-type="reader-again" class="gift-50 gift-img" /></a>' +
    '                   </div>' +
    '                   <div class="gift-25 gifts">' +
    '                       <div class="gift-text">您已挑战了30min，</div>' +
    '                       <div class="gift-text">收下京东送出的大礼券吧！</div>' +
    '                       <a href="http://coupon.m.jd.com/coupons/show.action?key=43c8410f188e44949b48eabd8c5ace88&roleId=3576787&to=home.m.jd.com/wallet/coupons"><img src="./images/25-gift.png" alt="" class="gift-50 gift-img" /></a>' +
    '                   </div>' +
    '                   <div class="gift-30 gifts">' +
    '                       <div class="gift-text">您已挑战了45min，</div>' +
    '                       <div class="gift-text">收下京东送出的大礼券吧！</div>' +
    '                       <a href="http://coupon.m.jd.com/coupons/show.action?key=9b2bfd1d9f364a43b420e96c60c9b84f&roleId=3576779&to=home.m.jd.com/wallet/coupons"><img src="./images/30-gift.png" alt="" class="gift-50 gift-img" /></a>' +
    '                   </div>' +
    '                   <div class="gift-100 gifts">' +
    '                       <div class="gift-text">您已挑战了60min，</div>' +
    '                       <div class="gift-text">收下京东送出的大礼券吧！</div>' +
    '                       <a href="http://coupon.m.jd.com/coupons/show.action?key=ce86ab32319b4a4e8a0ec34a5f2a767d&roleId=3576771&to=home.m.jd.com/wallet/coupons"><img src="./images/100-gift.png" alt="" class="gift-50 gift-img" /></a>' +
    '                   </div>' +
    '                   <div class="gift-lifeme gifts">' +
    '                       <div class="gift-text">您已挑战了120min，</div>' +
    '                       <div class="gift-text">收下京东送出的大礼券吧！</div>' +
    '                       <a href="javascript:void(0);"><img src="./images/lifeme.png" alt="" node-type="lifeme" class="gift-50 gift-img" /></a>' +
    '                   </div>' +
    '                   <div class="gift-pro5 gifts">' +
    '                       <div class="gift-text">您已挑战了120min，</div>' +
    '                       <div class="gift-text">收下京东送出的大礼券吧！</div>' +
    '                       <a href="javascript:void(0);"><img src="./images/pro5.png" alt="" node-type="pro" class="gift-50 gift-img" /></a>' +
    '                   </div>' +
    '                   <div class="gift-ear gifts">' +
    '                       <div class="gift-text">您已挑战了120min，</div>' +
    '                       <div class="gift-text">收下京东送出的大礼券吧！</div>' +
    '                       <a href="javascript:void(0);"><img src="./images/ep21.png" alt="" node-type="ear" class="gift-50 gift-img" /></a>' +
    '                   </div>' +
    '                   <div class="gift-limit gifts">' +
    '                       <div class="gift-text">每日奖励已领取完毕，</div>' +
    '                       <div class="gift-text">明天继续！</div>' +
    '                   </div>' +
    '                   <div class="gift-submit gifts">' +
    '                       <div class="gift-submit-title">获奖信息登记</div>' +
    '                       <div class="gift-submit-context name">' +
    '                           <span class="gift-submit-left">姓名：</span>' +
    '                           <input class="gift-submit-name" type="text" node-type="gift-name"/>' +
    '                       </div>' +
    '                       <div class="gift-submit-context tel">' +
    '                           <span class="gift-submit-left">电话：</span>' +
    '                           <input class="gift-submit-tel" type="text" node-type="gift-tel"/>' +
    '                       </div>' +
    '                       <div class="gift-submit-button" node-type="gift-submit-button">提交</div>' +
    '                       <div class="gift-submit-tip">(后期会有工作人员和您联系)</div>' +
    '                   </div>' +
    '               </div>' +
    '           </div>' +
    '       </div>' +
    '   </div>';

    module.exports = tpl;
});
