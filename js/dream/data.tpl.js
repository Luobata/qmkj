define(function (require, exports, module) {



    module.exports = function (data) {
        var tpl = '';
        data.forEach(function (item) {
            tpl += '' +
                '<div class="step-line-wrap"> '+
                '                <div class="step"> '+
                '                   <div class="img-wrap"> '+
                '                        <img src="' + item.headimgurl + '"> '+
                '                    </div> '+
                '                    <div class="content"> '+
                '                        <div class="title"> '+
                '                            <span class="title-name">' + item.nickname + '</span> '+
                '                        </div> '+
                '                        <div class="dream-txt"> '+
                '                            <span class="border-top"></span> '+
                '                            <span class="txt">' + item.dream + '</span> '+
                '                            <span class="border-bottom"></span> '+
                '                        </div> '+
                '                    </div> '+
                '                </div> '+
                '            </div>';
        });
        
        return tpl;
    };
});
