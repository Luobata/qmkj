define(function (require, exports, module) {
    var app;
    var content;
    var background;
    var background2;
    var background3;
    var sea;
    var garden;
    var castle;
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
        },
        {
            text: '我们路过湖泊',
            color: '#b5685d'
        }
    ];
    var imageArr = [
    ];
    var timer = 0;
    var rate = window.rate;

    function drawText(obj) {
        if (!obj) return;
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
                    drawSecond(background2, background3, './images/forest.png', function (background2) {
                        sea = getThird();;
                        toggleBackground(background2, sea, function () {
                            drawThird(sea.children[1]);
                        });
                    });
                });
            }
        });
        ticker.start();
    }

    function toggleBackground(back1, back2, fn) {
        var ticker = PIXI.ticker.shared;
        ticker.autoStart = false;

        back2.alpha = 0;
        back1.alpha = 1;

        drawText(text.shift());
        ticker.stop();
        timer = 0;
        ticker.add(function (time) {
            timer++;
            if (back1.alpha > 0 && back2.alpha < 1) {
                back1.alpha -= 0.01;
                back2.alpha += 0.01
            }

            if (timer === 100) {
                ticker.stop();
                ticker.remove();
                fn && fn(back2);
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

            if (timer === 100) {
                ticker.stop();
                ticker.remove();
                fn && fn(background2);
            }
        });
        ticker.start();
    }

    function drawThird(boat) {
        // 绘制船
        var ticker = PIXI.ticker.shared;

        ticker.stop();
        timer = 0;
        var flag = true;
        ticker.add(function (time) {
            timer++;
            if (timer < 200) {
                if (!flag) {
                    boat.rotation -= 0.0005;
                    if (boat.rotation < -0.05) {
                        flag = true; //向上
                    }
                } else {
                    boat.rotation += 0.0005;
                    if (boat.rotation > 0.05) {
                        flag = false; //向下
                    }
                }
            } else {
                getGarden();
                ticker.stop();
                ticker.remove();
                toggleBackground(sea, garden, gardenAnimate);
            }
        });
        ticker.start();
    }

    function getThird() {
        var container = new PIXI.Container();
        var images = PIXI.Sprite.fromImage('./images/rock.png');
        var boat = PIXI.Sprite.fromImage('./images/boat.png');
        var background = PIXI.Sprite.fromImage('./images/sea2.png');

        container.width = content.width();
        container.height = content.height();

        images.width = content.width();
        images.height = content.height();

        boat.width = 265.5 * rate;
        boat.height = 238.5 * rate;
        boat.y = 222 * rate;

        background.width = app.renderer.width;
        background.height = app.renderer.height;

        container.addChild(background);
        container.addChild(boat);
        container.addChild(images);

        app.stage.addChild(container);
        return container;
    }

    function getGarden() {
        // 花园 叶子飘落
        var container = new PIXI.Container();
        var images = PIXI.Sprite.fromImage('./images/garden.png');
        var leaf = PIXI.Sprite.fromImage('./images/leaf.png');

        images.width = content.width();
        images.height = content.height();
        leaf.width = 37.5 * rate;
        leaf.height = 14 * rate;
        leaf.x = 100;
        leaf.y = 100;

        container.addChild(images);
        container.addChild(leaf);

        app.stage.addChild(container);
        garden = container;
    }

    function gardenAnimate() {
        var ticker = PIXI.ticker.shared;
        var leafArr = garden.children;
        var leaf = leafArr[1];
        var flag = true;
        timer = 0;

        ticker.add(function () {
            timer++;
            if (!flag) {
                leaf.rotation -= 0.0005;
                if (leaf.rotation < -0.05) {
                    flag = true; //向上
                }
            } else {
                leaf.rotation += 0.0005;
                if (leaf.rotation > 0.05) {
                    flag = false; //向下
                }
            }
            leaf.y += 0.1;
            // console.log(leaf.y);
        });
        ticker.start();
    }

    function getCastle() {
        var container = new PIXI.Container();
        var images = PIXI.Sprite.fromImage('./images/castle.png');
        images.width = content.width();
        images.height = content.height();
        container.addChild(images);

        app.stage.addChild(container);
        castle = container;
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
