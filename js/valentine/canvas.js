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
    var boy;
    var girl;
    var complete;
    var people;
    var text = [
    ];
    var imageArr = [
    ];
    var timer = 0;
    var timer2 = 0;
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

    function boyWalk(boy) {
        var imageArr = boy.children;
        var flag = -1;
        imageArr.forEach(function (item, index) {
            //if ((timer / 100000) > 1) {
            if ((timer % 10) === 1) {
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
        boy.y = (422 - 94) * rate;

        boy.y = (288 - 94) * rate;

        container.addChild(txt);
        container.addChild(boy);
        app.stage.addChild(container);
        //app.stage.addChild(people);

        images.alpha = 1;
        ticker.autoStart = false;
        mountain = container;
        var boySpeed = 0.6;

        ticker.add(function (time) {
            timer += 1;
            boyWalk(boy);
            //if (boy.x < 200 * rate) {
            //    boy.x += boySpeed * rate;
            //    boy.y -= 0.1 * rate;
            //} else {
            //    boy.x += boySpeed * rate;
            //    boy.y -= 0.25 * rate;
            //}

            if (boy.x < 67 * rate) {
                boy.x += boySpeed * rate;
                boy.y -= 0.1 * rate;
            } else if (boy.x < 195 * rate) {
                boy.x += boySpeed * rate;
            } else {
                boy.x += boySpeed * rate;
                boy.y += 0.2 * rate;
            }

            if (boy.x >= content.width() * 2) {
                ticker.stop();
                ticker.remove();
                sea = getThird();
                toggleBackground(mountain, sea, drawThird);
            }
            return;
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
        timer2 = 0;
        fn && fn(back2);
        ticker.add(function (time) {
            timer2++;
            if (isWalking) walk();
            if (back1.alpha > 0 && back2.alpha < 1) {
                back1.alpha -= 0.005;
                back2.alpha += 0.005;
            }

            if (timer2 === 200) {
                //ticker.stop();
                //ticker.remove();
                //app.destroy(app);
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
        container.addChild(girl);
        container.addChild(txt);
        girl.x = content.width() * 2 - 20;
        girl.y = 182.5 * rate;

        app.stage.addChild(container);
        // app.stage.addChild(people);
        return container;
    }

    function desertAnimate() {
        var ticker = PIXI.ticker.shared;
        var girlSpeed = 1;
        ticker.stop();
        timer = 0;
        ticker.add(function (time) {
            timer++;
            boyWalk(girl);
            if (girl.x > -40.5 * rate) {
                girl.x -= girlSpeed * rate;
                girl.y += 0.1 * rate;
            } else {
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
        var images = PIXI.Sprite.fromImage('./images/forestB.jpg');
        var tree1 = PIXI.Sprite.fromImage('./images/tree.png');
        var tree2 = PIXI.Sprite.fromImage('./images/tree.png');
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

        tree1.width = 90 * rate;
        tree1.height = content.height() * 2;
        tree1.x = 76 * rate;

        tree2.width = 90 * rate;
        tree2.height = content.height() * 2;
        tree2.x = 272.5 * rate;

        container.addChild(images);
        container.addChild(boy);
        container.addChild(tree1);
        container.addChild(tree2);
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
            leafArr[4],
            leafArr[5],
            leafArr[6],
            leafArr[7],
            leafArr[8]
        ];
        var speed = [
            0.2 * rate,
            0.15 * rate,
            0.25 * rate,
            0.1 * rate,
            0.2 * rate
        ];
        var flag = new Array(5).fill(true);
        var i;
        var boySpeed = 0.5 * rate;
        timer = 0;
        boy.x = 0;
        boy.y = 300 * rate;
        ticker.add(function (time) {
            timer++;
            if (boy.x < content.width() * 2) {
                boyWalk(boy);
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

                boy.x += boySpeed * rate;
                boy.y -= 0.1 * rate;
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
            if (timer < 400) {
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
        var images = PIXI.Sprite.fromImage('./images/gardenB.png');
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

        girl.x = 166 * rate;
        girl.y = 229 * rate;

        container.addChild(images);
        container.addChild(girl);
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
        var leaf = [
            leafArr[2],
            leafArr[3],
            leafArr[4],
            leafArr[5],
            leafArr[6]
        ];
        var speed = [
            0.1 * rate,
            0.15 * rate,
            0.2 * rate,
            0.1 * rate,
            0.2 * rate
        ];
        var flag = new Array(5).fill(true);
        var i;
        var girlSpeed = 1;
        timer = 0;

        ticker.add(function () {
            timer++;
            boyWalk(girl);
            if (girl.x > -40.5 * rate) {
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
                girl.x -= girlSpeed * rate;
                girl.y += 0.1 * rate;
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
        var casteRate = rate * 3;

        timer = 0;
        ticker.add(function () {
            timer++;
            if (timer < 300) {
                cloud.x += 0.05 * (1 + Math.random()) * casteRate;
                if (!flag) {
                    cloud.rotation -= 0.00005 * casteRate;
                    cloud.y -= 0.005 * (1 + Math.random()) * casteRate;
                    if (cloud.rotation < -0.05 * rate) {
                        flag = true; //向上
                    }
                } else {
                    cloud.rotation += 0.00005 * casteRate;
                    cloud.y += 0.005 * (1 + Math.random()) * casteRate;
                    if (cloud.rotation > 0.02 * rate) {
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

    function createPepple(people, peopleString) {
        var people1 = PIXI.Sprite.fromImage('./images/' + peopleString + '1.png');
        var people2 = PIXI.Sprite.fromImage('./images/' + peopleString + '2.png');
        var people3 = PIXI.Sprite.fromImage('./images/' + peopleString + '3.png');
        var people4 = PIXI.Sprite.fromImage('./images/' + peopleString + '4.png');
        var people5 = PIXI.Sprite.fromImage('./images/' + peopleString + '5.png');
        var people6 = PIXI.Sprite.fromImage('./images/' + peopleString + '6.png');
        var people7 = PIXI.Sprite.fromImage('./images/' + peopleString + '7.png');
        var people8 = PIXI.Sprite.fromImage('./images/' + peopleString + '8.png');
        var txt = drawText(text.shift());

        people.width = content.width() * 2;
        people.height = content.height() * 2;

        people1.width = 57 * rate;
        people1.height = 94 * rate;
        people1.alpha = 1;

        people2.width = 40.5 * rate;
        people2.height = 94.5 * rate;
        people2.alpha = 0;

        people3.width = 24.5 * rate;
        people3.height = 94 * rate;
        people3.alpha = 0;
        people3.x = 10 * rate;

        people4.width = 40.5 * rate;
        people4.height = 94.5 * rate;
        people4.alpha = 0;

        people5.width = 57 * rate;
        people5.height = 94 * rate;
        people5.alpha = 0;

        people6.width = 40.5 * rate;
        people6.height = 94.5 * rate;
        people6.alpha = 0;

        people7.width = 24.5 * rate;
        people7.height = 94 * rate;
        people7.alpha = 0;
        people7.x = 10 * rate;

        people8.width = 40.5 * rate;
        people8.height = 94.5 * rate;
        people8.alpha = 0;


        //people5.width = 64.5 * rate;
        //people5.height = 96.5 * rate;
        //people5.alpha = 0;

        people.addChild(people1);
        people.addChild(people2);
        people.addChild(people3);
        people.addChild(people4);
        people.addChild(people5);
        people.addChild(people6);
        people.addChild(people7);
        people.addChild(people8);
    }

    function createGirl(people, peopleString) {
        var people1 = PIXI.Sprite.fromImage('./images/' + peopleString + '1.png');
        var people2 = PIXI.Sprite.fromImage('./images/' + peopleString + '2.png');
        var people3 = PIXI.Sprite.fromImage('./images/' + peopleString + '3.png');
        var people4 = PIXI.Sprite.fromImage('./images/' + peopleString + '4.png');
        var people5 = PIXI.Sprite.fromImage('./images/' + peopleString + '5.png');
        var people6 = PIXI.Sprite.fromImage('./images/' + peopleString + '6.png');
        var people7 = PIXI.Sprite.fromImage('./images/' + peopleString + '7.png');
        var people8 = PIXI.Sprite.fromImage('./images/' + peopleString + '8.png');
        var txt = drawText(text.shift());

        people.width = content.width() * 2;
        people.height = content.height() * 2;

        people1.width = 60 * rate;
        people1.height = 94 * rate;
        people1.alpha = 1;
        people1.x = -20 * rate;

        people2.width = 40.5 * rate;
        people2.height = 94.5 * rate;
        people2.alpha = 0;

        people3.width = 24.5 * rate;
        people3.height = 94 * rate;
        people3.alpha = 0;
        people3.x = 7.5 * rate;

        people4.width = 40.5 * rate;
        people4.height = 94.5 * rate;
        people4.alpha = 0;

        people5.width = 67 * rate;
        people5.height = 94 * rate;
        people5.alpha = 0;
        people5.x = -20 * rate;

        people6.width = 40.5 * rate;
        people6.height = 94.5 * rate;
        people6.alpha = 0;

        people7.width = 24.5 * rate;
        people7.height = 94 * rate;
        people7.alpha = 0;
        people7.x = 7.5 * rate;

        people8.width = 40.5 * rate;
        people8.height = 94.5 * rate;
        people8.alpha = 0;

        people.addChild(people1);
        people.addChild(people2);
        people.addChild(people3);
        people.addChild(people4);
        people.addChild(people5);
        people.addChild(people6);
        people.addChild(people7);
        people.addChild(people8);
    }

    // canvas.init
    var init = function (dom, fn) {
        var html = document.body;
        content = dom;
        people = new PIXI.Container();
        boy = new PIXI.Container();
        girl = new PIXI.Container();
        createPepple(boy, 'boy');
        createGirl(girl, 'girl');
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

        app = new PIXI.Application(dom.width() * 2, dom.height() * 2);
        dom.append(app.view);

        background.width = dom.width() * 2;
        background.height = dom.height() * 2;

        app.stage.addChild(background);

        drawFirst();
        //getGarden();
        //gardenAnimate();
        //desert = getDesert();
        //desertAnimate();
    };


    module.exports = init;
});
