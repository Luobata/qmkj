define(function (require, exports, module) {
    var app;
    var content;
    var background;
    var background2;
    var background3;
    var mountain;
    var desert;
    var forest;
    var sea;
    var garden;
    var castle;
    var complete;
    var people;
    var text = [
    ];
    var imageArr = [
    ];
    var timer = 0;
    var rate = window.rate * 2;

    function drawText(obj) {
        if (!obj) return;
        var style = new PIXI.TextStyle({
            fontFamily: 'microsoft yahei',
            fontSize: 21 * rate,
            fill: obj.color 
        });
        var richText = new PIXI.Text(obj.text, style);
        richText.x = (content.width() * rate  - 124 * rate) / rate;
        richText.y = 102 * rate;

        //app.stage.addChild(richText);
        return richText;
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
            imageArr[(flag + 1) % imageArr.length].alpha = 1;
        }
    }

    function drawFirst() {
        var container = new PIXI.Container();
        var images = PIXI.Sprite.fromImage('./images/people2.png');
        var images2 = PIXI.Sprite.fromImage('./images/people3.png');
        var images3 = PIXI.Sprite.fromImage('./images/people4.png');
        var images4 = PIXI.Sprite.fromImage('./images/people2.png');
        var txt = drawText(text.shift());
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
                item.x = (content.width() *2 - item.width) / 2;
            });
            if (flag !== -1) {
                imageArr[(flag + 1) % imageArr.length].alpha = 1;
            }
        };

        imageArr.push(images);
        imageArr.push(images2);
        imageArr.push(images4);
        imageArr.push(images3);

        imageArr.forEach(function (item) {
            item.width = 47 / 5 * 2;
            item.height = 80 / 5 * 2;
            item.x = (content.width() * 2 - item.width) / 2 * rate;
            item.y = 241 * 2;
            item.alpha = 0;
            people.addChild(item);
        });
        container.addChild(people);
        container.addChild(txt);
        app.stage.addChild(container);
        //app.stage.addChild(people);

        images.alpha = 1;
        ticker.autoStart = false;
        mountain = container;

        ticker.add(function (time) {
            timer += 1;
            if (images.y < 350 * rate) {
                images.y += 0.3;
                images2.y += 0.3;
                images3.y += 0.3;
                images4.y += 0.3;
            }

            if (images.width < 47 * rate) {
                change();
            } else {
                ticker.stop();
                ticker.remove();
                sea = getThird();
                toggleBackground(mountain, sea, drawThird);
            }
        });
        ticker.start();
    }

    function toggleBackground(back1, back2, fn, isWalking) {
        var ticker = PIXI.ticker.shared;
        ticker.autoStart = false;

        back2.alpha = 0;
        back1.alpha = 1;

        ticker.stop();
        timer = 0;
        ticker.add(function (time) {
            timer++;
            if (isWalking) walk();
            if (back1.alpha > 0 && back2.alpha < 1) {
                back1.alpha -= 0.01;
                back2.alpha += 0.01
            }

            if (timer === 100) {
                ticker.stop();
                ticker.remove();
                //app.destroy(app);
                fn && fn(back2);
            }
        });
        ticker.start();
    }

    function getDesert() {
        var container = new PIXI.Container();
        var images = PIXI.Sprite.fromImage('./images/desert.png');
        var txt = drawText(text.shift());
        images.width = content.width() * 2;
        images.height = content.height() * 2;
        container.addChild(images);
        container.addChild(txt);

        app.stage.addChild(container);
        // app.stage.addChild(people);
        return container;
    }

    function desertAnimate() {
        var ticker = PIXI.ticker.shared;
        ticker.stop();
        timer = 0;
        ticker.add(function (time) {
            timer++;
            // walk();
            if (timer === 100) {
                getCastle();
                ticker.stop();
                ticker.remove();
                toggleBackground(desert, castle, castleAnimate);
            }
        });
        ticker.start();
    }

    function getForest() {
        var container = new PIXI.Container();
        var images = PIXI.Sprite.fromImage('./images/forest.png');
        var leaf1 = PIXI.Sprite.fromImage('./images/y1.png');
        var leaf2 = PIXI.Sprite.fromImage('./images/y2.png');
        var leaf3 = PIXI.Sprite.fromImage('./images/y3.png');
        var leaf4 = PIXI.Sprite.fromImage('./images/y4.png');
        var leaf5 = PIXI.Sprite.fromImage('./images/y5.png');
        var txt = drawText(text.shift());

        images.width = content.width() * 2;
        images.height = content.height() * 2;

        leaf1.width = 53 * rate;
        leaf1.height = 45.5 * rate;
        leaf1.x = 30 * rate;
        leaf1.y = 47 * rate;
        
        leaf2.width = 43 * rate;
        leaf2.height = 36.5 * rate;
        leaf2.x = 117 * rate;
        leaf2.y = 161.5 * rate;
        
        leaf3.width = 46 * rate;
        leaf3.height = 40 * rate;
        leaf3.x = 55 * rate;
        leaf3.y = 333.5 * rate;
        
        leaf4.width = 40 * rate;
        leaf4.height = 47.5 * rate;
        leaf4.x = 255 * rate;
        leaf4.y = 396 * rate;
        
        leaf5.width = 40 * rate;
        leaf5.height = 40 * rate;
        leaf5.x = 144 * rate;
        leaf5.y = 528 * rate;

        container.addChild(images);
        container.addChild(leaf1);
        container.addChild(leaf2);
        container.addChild(leaf3);
        container.addChild(leaf4);
        container.addChild(leaf5);
        container.addChild(txt);

        app.stage.addChild(container);
        // app.stage.addChild(people);
        return container;
    }

    function forestAnimate() {
        var ticker = PIXI.ticker.shared;
        ticker.stop();
        var leafArr = forest.children;
        var leaf = [
            leafArr[1],
            leafArr[2],
            leafArr[3],
            leafArr[4],
            leafArr[5]
        ];
        var speed = [
            0.2,
            0.15,
            0.25,
            0.1,
            0.2
        ];
        var flag = new Array(5).fill(true);
        var i;
        timer = 0;
        ticker.add(function (time) {
            timer++;
            // walk();
            if (timer < 300) {
                for (i = 0; i < flag.length; i++) {
                    if (!flag[i]) {
                        leaf[i].rotation -= 0.0005 * (1 + Math.random() * 10);
                        if (leaf[i].rotation < -0.3 * (1 + Math.random())) {
                            flag[i] = true; //向上
                        }
                    } else {
                        leaf[i].rotation += (0.0005 * (1 + Math.random() * 10));
                        if (leaf[i].rotation > 0.3 * (1 + Math.random())) {
                            flag[i] = false; //向下
                        }
                    }
                    leaf[i].y += speed[i] * (1 + Math.random() * 4);
                }
            } else {
                desert = getDesert();
                ticker.stop();
                ticker.remove();
                toggleBackground(forest, desert, desertAnimate);
            }
        });
        ticker.start();
    }

    function drawThird() {
        // 绘制船
        var ticker = PIXI.ticker.shared;
        var boat = sea.children[1]

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
                forest = getForest();
                ticker.stop();
                ticker.remove();
                toggleBackground(sea, forest, forestAnimate);
            }
        });
        ticker.start();
    }

    function getThird() {
        var container = new PIXI.Container();
        var images = PIXI.Sprite.fromImage('./images/rock.png');
        var boat = PIXI.Sprite.fromImage('./images/boat.png');
        var background = PIXI.Sprite.fromImage('./images/sea2.png');
        var txt = drawText(text.shift());

        container.width = content.width() * 2;
        container.height = content.height() * 2;

        images.width = content.width() * 2;
        images.height = content.height() * 2;

        boat.width = 291.5 * rate;
        boat.height = 284 * rate;
        boat.y = 192 * rate;

        background.width = app.renderer.width;
        background.height = app.renderer.height;

        container.addChild(background);
        container.addChild(boat);
        container.addChild(images);
        container.addChild(txt);

        app.stage.addChild(container);
        return container;
    }

    function getGarden() {
        // 花园 叶子飘落
        var container = new PIXI.Container();
        var images = PIXI.Sprite.fromImage('./images/garden.png');
        var leaf1 = PIXI.Sprite.fromImage('./images/leaf1.png');
        var leaf2 = PIXI.Sprite.fromImage('./images/leaf1.png');
        var leaf3 = PIXI.Sprite.fromImage('./images/leaf2.png');
        var leaf4 = PIXI.Sprite.fromImage('./images/leaf2.png');
        var leaf5 = PIXI.Sprite.fromImage('./images/leaf2.png');
        var txt = drawText(text.shift());

        images.width = content.width() * 2;
        images.height = content.height() * 2;

        leaf1.width = 16.5 * rate;
        leaf1.height = 21.5 * rate;
        leaf1.x = 240 * rate;
        leaf1.y = 58 * rate;
        
        leaf2.width = 16.5 * rate;
        leaf2.height = 21.5 * rate;
        leaf2.x = 240 * rate;
        leaf2.y = 260 * rate;
        
        leaf3.width = 18.5 * rate;
        leaf3.height = 15.5 * rate;
        leaf3.x = 190 * rate;
        leaf3.y = 130 * rate;
        
        leaf4.width = 18.5 * rate;
        leaf4.height = 15.5 * rate;
        leaf4.x = 79 * rate;
        leaf4.y = 150 * rate;
        
        leaf5.width = 18.5 * rate;
        leaf5.height = 15.5 * rate;
        leaf5.x = 121 * rate;
        leaf5.y = 328 * rate;

        container.addChild(images);
        container.addChild(leaf1);
        container.addChild(leaf2);
        container.addChild(leaf3);
        container.addChild(leaf4);
        container.addChild(leaf5);
        container.addChild(txt);

        app.stage.addChild(container);
        garden = container;
    }

    function gardenAnimate() {
        var ticker = PIXI.ticker.shared;
        var leafArr = garden.children;
        var leaf1 = leafArr[1];
        var leaf2 = leafArr[2];
        var leaf3 = leafArr[3];
        var leaf4 = leafArr[4];
        var leaf5 = leafArr[5];
        var leaf = [
            leafArr[1],
            leafArr[2],
            leafArr[3],
            leafArr[4],
            leafArr[5]
        ];
        var speed = [
            0.1,
            0.15,
            0.2,
            0.1,
            0.2
        ];
        var flag = new Array(5).fill(true);
        var i;
        timer = 0;

        ticker.add(function () {
            timer++;
            if (timer  < 200) {
                for (i = 0; i < flag.length; i++) {
                    if (!flag[i]) {
                        leaf[i].rotation -= 0.0005 * (1 + Math.random() * 10);
                        if (leaf[i].rotation < -0.3 * (1 + Math.random())) {
                            flag[i] = true; //向上
                        }
                    } else {
                        leaf[i].rotation += (0.0005 * (1 + Math.random() * 10));
                        if (leaf[i].rotation > 0.3 * (1 + Math.random())) {
                            flag[i] = false; //向下
                        }
                    }
                    leaf[i].y += speed[i] * (1 + Math.random() * 4);
                }
            } else {
                ticker.stop();
                ticker.remove();
                complete && complete();
                app.destroy(app);
            }
        });
        ticker.start();
    }

    function getCastle() {
        var container = new PIXI.Container();
        var images = PIXI.Sprite.fromImage('./images/castle.png');
        var background = PIXI.Sprite.fromImage('./images/castleB.png');
        var cloud = PIXI.Sprite.fromImage('./images/cloud.png');
        var txt = drawText(text.shift());

        images.width = content.width() * 2;
        images.height = content.height() * 2;
        background.width = content.width() * 2;
        background.height = content.height() * 2;
        cloud.width = 225 * rate;
        cloud.height = 233 * rate;
        cloud.x = 70 * rate;
        cloud.y = 30 * rate;

        container.addChild(images);
        container.addChild(cloud);
        container.addChild(background);
        container.addChild(txt);

        app.stage.addChild(container);
        castle = container;
    }

    function castleAnimate() {
        var ticker = PIXI.ticker.shared;
        var cloud = castle.children[1];
        var flag = true;

        timer = 0;
        ticker.add(function () {
            timer++;
            if (timer < 200) {
                cloud.x += 0.05 * (1 + Math.random());
                if (!flag) {
                    cloud.rotation -= 0.00005;
                    cloud.y -= 0.005 * (1 + Math.random());
                    if (cloud.rotation < -0.05) {
                        flag = true; //向上
                    }
                } else {
                    cloud.rotation += 0.00005;
                    cloud.y += 0.005 * (1 + Math.random());
                    if (cloud.rotation > 0.02) {
                        flag = false; //向下
                    }
                }
            } else {
                getGarden()
                ticker.stop();
                ticker.remove();
                toggleBackground(castle, garden, gardenAnimate);
            }
        });
        ticker.start();
    }

    // canvas.init
    var init = function (dom, fn) {
        var html = document.body;
        people = new PIXI.Container();
        imageArr = [];
        text = [
            {
                text: '我们路过高山',
                color: '#b96c40'
            },
            {
                text: '我们路过湖泊',
                color: '#b5685d'
            },
            {
                text: '我们路过森林',
                color: '#ffffff'
            },
            {
                text: '我们路过沙漠',
                color: '#b5685d'
            },
            {
                text: '我们路过城堡',
                color: '#b5685d'
            },
            {
                text: '我们路过花园',
                color: '#b5685d'
            }
        ];
        complete = fn;

        background = PIXI.Sprite.fromImage('./images/mountain.png');

        content = dom;
        app = new PIXI.Application(dom.width() * 2, dom.height() * 2);
        dom.append(app.view);

        background.width = dom.width() * 2;
        background.height = dom.height() * 2;

        app.stage.addChild(background);

        drawFirst();
    };


    module.exports = init;
});
