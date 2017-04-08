define(function (require, exports, module) {
    var app;
    var content;
    var background;
    var background2;
    var background3;
    var text = [
        {
            text: '我们路过高山',
            color: '#b96c40'
        },
        {
            text: '我们路过沙漠',
            color: '#b5685d'
        },
        {
            text: '我们路过森林',
            color: '#ffffff'
        }
    ];
    var imageArr = [
    ];
    var timer = 0;

    function drawText(obj) {
        var style = new PIXI.TextStyle({
            fontFamily: 'microsoft yahei',
            fontSize: 21,
            fill: obj.color 
        });
        var richText = new PIXI.Text(obj.text, style);
        richText.x = content.width() / 2 - 60;
        richText.y = 102;

        app.stage.addChild(richText);
    }

    function walk() {
        var flag = -1;
        imageArr.forEach(function (item, index) {
            //console.log(timer / 1000);
            //if ((timer / 100000) > 1) {
            if ((timer % 20) === 1) {
                if (item.alpha === 1) {
                    item.alpha = 0;
                    flag = index;
                }
            }
        });
        if (flag !== -1) {
            imageArr[(flag + 1) % 2].alpha = 1;
        }
    }

    function drawFirst() {
        drawText(text.shift());
        var images = PIXI.Sprite.fromImage('./images/people2.png');
        var images2 = PIXI.Sprite.fromImage('./images/people.png');
        var ticker = PIXI.ticker.shared;
        var change = function () {
            var flag = -1;
            imageArr.forEach(function (item, index) {
                if ((timer % 20) === 1) {
                    if (item.alpha === 1) {
                        item.alpha = 0;
                        flag = index;
                    }
                }
                item.width  = item.width * 1.005;
                item.height = item.height * 1.005;
                item.x = (content.width() - item.width) / 2;
            });
            if (flag !== -1) {
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
                change();
            } else {
                ticker.stop();
                ticker.remove();
                drawSecond(background, background2, './images/desert.png', function (background2) {
                    drawSecond(background2, background3, './images/forest.png', function () {
                    });
                });
            }
        });
        ticker.start();
    }

    function drawSecond(background, background2, src, fn) {
        var ticker = PIXI.ticker.shared;
        ticker.autoStart = false;

        background2 = PIXI.Sprite.fromImage(src);
        background2.width = app.renderer.width;
        background2.height = app.renderer.height;
        background2.alpha = 0;

        app.stage.addChild(background2);
        background.alpha = 1;
        imageArr.forEach(function (item) {
            app.stage.addChild(item);
        });
        drawText(text.shift());
        ticker.stop();
        timer = 0;
        ticker.add(function (time) {
            timer++;
            walk();
            if (background.alpha > 0 && background2.alpha < 1) {
                background.alpha -= 0.01;
                background2.alpha += 0.01
            }

            if (timer === 200) {
                ticker.stop();
                ticker.remove();
                fn && fn(background2);
            }
        });
        ticker.start();
    }

    // canvas.init
    var init = function (dom) {
        var html = document.body;

        background = PIXI.Sprite.fromImage('./images/mountain.png');

        content = dom;
        app = new PIXI.Application(dom.width(), dom.height());
        dom.append(app.view);

        background.width = app.renderer.width;
        background.height = app.renderer.height;

        app.stage.addChild(background);

        drawFirst();
    };


    module.exports = init;
});
