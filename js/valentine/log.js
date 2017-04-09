define(function (require, exports, module) {
    module.exports = function (type) {
        $.ajax({
            url: './index.php?r=log/add/type/' + type,
            type: 'GET'
        });
    }
});
