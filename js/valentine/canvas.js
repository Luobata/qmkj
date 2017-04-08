define(function (require, exports, module) {
    var app;
    var content;
    var text = [
        '我们路过高山'
    ];

    function drawText(text) {
        var style = new PIXI.TextStyle({
            fontFamily: 'microsoft yahei',
            fontSize: 21,
            fill: '#b5685d'
        });
        var richText = new PIXI.Text(text, style);
        richText.x = content.width() / 2 - 60;
        richText.y = 102;

        app.stage.addChild(richText);
    }

    function drawFirst() {
        drawText(text.shift());
        var imageArr = [
        ];
        var images = PIXI.Sprite.fromImage('./images/people2.png');
        var images2 = PIXI.Sprite.fromImage('./images/people.png');
        var ticker = PIXI.ticker.shared;
        var timer = 0;
        var change = function (timer) {
            var flag = -1;
            imageArr.forEach(function (item, index) {
                if ((timer % 20) === 1) {
                    if (item.alpha === 1) {
                        item.alpha = 0;
                        flag = index;
                    }
                }
                    //changeShow();
                item.width  = item.width * 1.005;
                item.height = item.height * 1.005;
                item.x = (content.width() - item.width) / 2;
            });
            if (flag != -1) {
                imageArr[(flag + 1) % 2].alpha = 1;
            }
        };

        imageArr.push(images);
        imageArr.push(images2);

        imageArr.forEach(function (item) {
            item.width = 47 / 5;
            item.height = 80 / 5;
            item.x = (content.width() - item.width) / 2;
            item.y = 241;
            item.alpha = 0;
            app.stage.addChild(item);
        });

        images.alpha = 1;
        ticker.autoStart = false;

        ticker.add(function (time) {
            timer += 1;
            if (images.y < 350) {
                images.y += 0.3;
                images2.y += 0.3;
            }

            if (images.width < 47) {
                change(timer);
            } else {
                ticker.stop();
            }
        });
        ticker.start();
    }

    // canvas.init
    var init = function (dom) {
        var html = document.body;
        var background = PIXI.Sprite.fromImage('./images/mountain.png');

        content = dom;
        app = new PIXI.Application(dom.width(), dom.height());
        dom.append(app.view);

        background.width = app.renderer.width;
        background.height = app.renderer.height;

        app.stage.addChild(background);

        var basicText = new PIXI.Text('Basic text in pixi');
        basicText.x = 30;
        basicText.y = 90;

        drawFirst();
    };


    module.exports = init;
});
