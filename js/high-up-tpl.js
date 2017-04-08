define(function (require, exports, module) {

var tpl = '' +
    '<div class="module-high-up">' +
    '   <div class="high-up-header">' +
    '       <div class="header-return" node-type="return-back">' +
    '           <span class="return-icon"></span><span class="return-text">返回首页</span>' +
    '       </div>' +
    '       <div class="header-logo"></div>' +
    '   </div>' +
    '   <div class="high-up-title">' +
    '       <span class="title-icon"></span>' +
    '       <span class="title-text"></span>' +
    '   </div>' +
    '   <div class="high-ups">' +
    '       <div class="high-up">' +
    '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-1.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">蒋丰</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">说说十大日本侵华人物</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">天津大学</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">变化中的中日两国和变化中的中日关系——《蒋丰看日本：说说十大日本侵华任务》新书分享会</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">9月8日</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11952321.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
    '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-2.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">刘建宏</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">上半场&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">北京邮电大学</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">北邮学子，中国足球需要你</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">9月9日</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11917402.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
    '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-3.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">马克里维</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">偷影子的人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">北京大学</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">遇见马克•李维，爱上《她和他》</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">9月13日</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11018526.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
    '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-4.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">苑子文苑子豪</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">穿越人海拥抱你&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">北京区域高校</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">人生坎坷重重，一一温暖相拥</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11905471.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
    '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-5.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">李尚龙</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">你所谓的稳定，不过是在浪费生命</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">北京区域高校</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11873563.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
    '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-6.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">张宏杰</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">曾国藩的正面与侧面</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">北京区域高校</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11440704.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
    '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-7.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">午歌</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">晚安，我亲爱的人</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">浙江区域高校</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11620669.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
        '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-8.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">吴恩锡</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">跟土豆Dori学韩语1</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">上海区域高校</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/12009742.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
        '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-9.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">徐永海</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">空手道“型” 筑基锻体篇</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">上海区域高校</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11757803.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
        '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-10.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">曲根</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">星火英语 大学英语六级真题面</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">广东区域高校</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11945819.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
        '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-11.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">余点</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">女神日常修炼手册</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">广东区域高校</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11824412.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
        '           <div class="high-up-context">' +
    '               <div class="high-up-img">' +
    '                   <img src="./images/pic-12.jpg" alt="" class="high-up-pic" />' +
    '               </div>' +
    '               <div class="high-up-ind">' +
    '                   <p class="high-up-host high-up-p">' +
    '                       <span class="ind-title">主&nbsp;&nbsp;讲&nbsp;&nbsp;人&nbsp;： </span><span class="ind-host">王菲</span>' +
    '                   </p>' +
    '                   <p class="high-up-article high-up-p">' +
    '                       <span class="ind-title">大咖作品： </span><span class="ind-host">星火英语 大学英语四级真题</span>' +
    '                   </p>' +
    '                   <p class="high-up-place high-up-p">' +
    '                       <span class="ind-title">宣讲高校：</span><span class="ind-place">广东区域高校</span>' +
    '                   </p>' +
    '                   <p class="high-up-choice high-up-p">' +
    '                       <span class="ind-title"></span><span class="ind-choice">由阅读时间决定</span>' +
    '                   </p>' +
    '                   <p class="high-up-topic high-up-p">' +
    '                       <span class="ind-title">宣讲主题：</span><span class="ind-topic">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-time high-up-p">' +
    '                       <span class="ind-title">宣讲时间：</span><span class="ind-time">待定</span>' +
    '                   </p>' +
    '                   <p class="high-up-button high-up-p">' +
    '                       <a href="http://item.jd.com/11945817.html"><span class="high-up-know" node-type="high-up-know">了解TA</span></a><span class="high-up-join-now" node-type="high-up-join-now">立刻报名</span>' +
    '                   </p>' +
    '               </div>' +
    '           </div>' +
    '   </div>' +
    '</div>';

    module.exports = tpl;
});
