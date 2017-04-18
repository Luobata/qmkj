define(function (require, exports, module) {
    var app;
    var content;
    var bg = [];
    var bg2 = [];
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
            fontSize: 24 * rate,
            fill: obj.color 
        });
        var richText = new PIXI.Text(obj.text, style);

        return richText;
    }

    function drawTip(obj) {
        if (!obj) return;
        var graphics = new PIXI.Graphics();
        var style = new PIXI.TextStyle({
            fontFamily: 'microsoft yahei',
            fontSize: 18 * rate,
            fill: '#fff' 
        });
        var text = new PIXI.Text(obj.text, style);
        text.width = text.width * 2;
        text.x = 30 * rate;
        text.y = 2.5 * rate;
        text.y = 1 * rate;
        graphics.beginFill(obj.color);
        graphics.moveTo(0, 25 * rate);
        graphics.lineTo(200 * rate, 25 * rate);
        graphics.lineTo(200 * rate, 0);
        graphics.lineTo(0, 0);
        graphics.endFill();

        graphics.addChild(text);

        return graphics;
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
            if ((timer % 15) === 1) {
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
        var leftC = new PIXI.Container();
        var rightC = new PIXI.Container();
        var txt = drawText(text.shift());
        var ticker = PIXI.ticker.shared;
        var mountainB = PIXI.Sprite.fromImage('./images/mountain.png');
        var seaB = PIXI.Sprite.fromImage('./images/sea-b.png');
        var rock = PIXI.Sprite.fromImage('./images/sea-rock.png');
        var boat = PIXI.Sprite.fromImage('./images/sea-boat.png');
        var leftT = drawText({
            text: '我',
            color: '#63242e'
        });
        var leftR = drawText({
            text: '们',
            color: '#63242e'
        });
        var textL = drawTip({
            text: '跨过高山',
            color: '0xcc8c91'
        });
        var textR = drawTip({
            text: '路过湖泊',
            color: '0x545b82'
        });

        leftT.x = 110 * rate;
        leftT.x = content.width() + 96 * rate;
        leftT.y = 60 * rate;
        leftT.width = leftT.width * 2;

        leftR.x = content.width() * 2 - 310 * rate;
        leftR.y = 60 * rate;
        leftR.width = leftR.width * 2;

        textL.x = 110 * rate;
        textL.y = 105 * rate;

        textR.x = content.width() - 150 * rate;
        textR.y = 105 * rate;

        mountainB.width = content.width() * 4;
        mountainB.height = content.height() * 2;

        seaB.width = content.width() * 4;
        seaB.height = content.height() * 2;
        seaB.x = -content.width() * 2;
        rock.width = content.width() * 4;
        rock.height = content.height() * 2;
        rock.x = -content.width() * 2;
        boat.width = 227.5 * rate * 2;
        boat.height = 220 * rate;
        boat.y = 225 * rate;
        boat.x = 100 * rate;

        leftC.width = content.width() * 2;
        leftC.height = content.height() * 2;
        rightC.width = content.width() * 2;
        rightC.height = content.height();

        girl.x = 30 * rate;
        girl.y = 330 * rate;
        leftC.addChild(mountainB);
        leftC.addChild(girl);
        leftC.addChild(leftT);
        leftC.addChild(textL);
        rightC.addChild(seaB);
        rightC.addChild(boat);
        rightC.addChild(rock);
        rightC.addChild(leftR);
        rightC.addChild(textR);

        bg.push(leftC);
        bg2.push(rightC);

        app.stage.addChild(leftC);
        app2.stage.addChild(rightC);

        ticker.autoStart = false;
        var boySpeed = 0.6;
        var flag = true;

        ticker.add(function (time) {
            timer += 1;
            if (timer < 400) {
                boyWalk(girl);
                girl.x += 0.9;
                boat.x -= 0.9;
                leftC.x -= 0.5;
                leftT.x += 0.5;
                textL.x += 0.5;
                rightC.x += 0.5;
                leftR.x -= 0.5;
                textR.x -= 0.5;
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
                ticker.stop();
                ticker.remove();
                //toggleBackground();
                drawSecond();
            }
        });
        ticker.start();
    }

    function drawSecond() {
        var leftC = new PIXI.Container();
        var rightC = new PIXI.Container();
        var ticker = PIXI.ticker.shared;
        var desert = PIXI.Sprite.fromImage('./images/desert.png');
        var castle = PIXI.Sprite.fromImage('./images/castle-b.png');
        var leftT = drawText({
            text: '我',
            color: '#63242e',
        });
        var leftR = drawText({
            text: '们',
            color: '#fff'
        });
        var textL = drawTip({
            text: '穿过沙漠',
            color: '0xcc8c91'
        });
        var textR = drawTip({
            text: '越过城堡',
            color: '0x133340'
        });

        leftT.x = 110 * rate;
        leftT.x = content.width() + 96 * rate;
        leftT.y = 60 * rate;
        leftT.width = leftT.width * 2;

        leftR.x = content.width() * 2 - 306 * rate;
        leftR.y = 60 * rate;
        leftR.width = leftR.width * 2;

        textL.x = 110 * rate;
        textL.y = 105 * rate;

        textR.x = content.width() - 150 * rate;
        textR.y = 105 * rate;

        desert.width = content.width() * 4;
        desert.height = content.height() * 2;

        castle.width = content.width() * 4;
        castle.height = content.height() * 2;
        castle.x = -content.width() * 2;

        leftC.width = content.width() * 2;
        leftC.height = content.height() * 2;
        rightC.width = content.width() * 2;
        rightC.height = content.height();

        girl.x = 30 * rate;
        girl.y = 330 * rate;

        boy.x = 230 * rate;
        boy.y = 330 * rate;
        
        leftC.addChild(desert);
        leftC.addChild(girl);
        leftC.addChild(leftT);
        leftC.addChild(textL);
        rightC.addChild(castle);
        rightC.addChild(leftR);
        rightC.addChild(textR);
        rightC.addChild(boy);

        bg.push(leftC);
        bg2.push(rightC);

        app.stage.addChild(leftC);
        app2.stage.addChild(rightC);

        leftC.alpha = 0;
        rightC.alpha = 0;
        timer = 0;
        timer2 = 0;
        console.log(2);

        ticker.add(function (time) {
            timer++;
            boyWalk(girl);
            boyWalk(boy);
            girl.x += 0.9;
            boy.x -= 0.9;
            leftC.x -= 0.5;
            leftT.x += 0.5;
            textL.x += 0.5;
            rightC.x += 0.5;
            leftR.x -= 0.5;
            textR.x -= 0.5;

            if (bg[0].alpha > 0 && bg[1].alpha < 1) {
                bg[0].alpha -= 0.005;
                bg[1].alpha += 0.005;
                bg2[0].alpha -= 0.005;
                bg2[1].alpha += 0.005;
            } else if (timer2 < 300) {
                timer2++;
            } else {
                ticker.stop();
                ticker.remove();
                complete && complete();
                app.destroy(app);
            }
        });
        ticker.start();
    };

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

        people.width = content.width() * 2;
        people.height = content.height() * 2;

        people1.width = 42.5 * rate * 2;
        people1.height = 94 * rate;
        people1.alpha = 1;

        people2.width = 40.5 * rate * 2;
        people2.height = 94.5 * rate;
        people2.alpha = 0;

        people3.width = 23.5 * rate * 2;
        people3.height = 94 * rate;
        people3.alpha = 0;
        people3.x = 10 * rate;

        people4.width = 43 * rate * 2;
        people4.height = 91.5 * rate;
        people4.alpha = 0;

        people5.width = 40.5 * rate * 2;
        people5.height = 94.5 * rate;
        people5.alpha = 0;
        
        people6.width = 23.5 * rate * 2;
        people6.height = 94 * rate;
        people6.alpha = 0;
        people6.x = 10 * rate;


        people.addChild(people1);
        people.addChild(people2);
        people.addChild(people3);
        people.addChild(people4);
        people.addChild(people5);
        people.addChild(people6);
    }

    function createGirl(people, peopleString) {
        var people1 = PIXI.Sprite.fromImage('./images/' + peopleString + '1.png');
        var people2 = PIXI.Sprite.fromImage('./images/' + peopleString + '2.png');
        var people3 = PIXI.Sprite.fromImage('./images/' + peopleString + '3.png');
        var people4 = PIXI.Sprite.fromImage('./images/' + peopleString + '4.png');
        var people5 = PIXI.Sprite.fromImage('./images/' + peopleString + '5.png');
        var people6 = PIXI.Sprite.fromImage('./images/' + peopleString + '6.png');
        var txt = drawText(text.shift());

        people.width = content.width() * 2;
        people.height = content.height() * 2;

        people1.width = 45 * rate * 2;
        people1.height = 102 * rate;
        people1.alpha = 1;
        people1.x = -10 * rate;

        people2.width = 40.5 * rate * 2;
        people2.height = 102 * rate;
        people2.alpha = 0;

        people3.width = 25.5 * rate * 2;
        people3.height = 102 * rate;
        people3.alpha = 0;
        people3.x = 9.5 * rate;

        people4.width = 45 * rate * 2;
        people4.height = 102 * rate;
        people4.alpha = 0;
        people4.x = -10 * rate;

        people5.width = 40.5 * rate * 2;
        people5.height = 102 * rate;
        people5.alpha = 0;
        people5.x = 0 * rate;

        people6.width = 25.5 * rate * 2;
        people6.height = 102 * rate;
        people6.alpha = 0;
        people6.x = 9.5 * rate;

        people.addChild(people1);
        people.addChild(people2);
        people.addChild(people3);
        people.addChild(people4);
        people.addChild(people5);
        people.addChild(people6);
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


        app = new PIXI.Application(dom.width() * 2, dom.height() * 2);
        app2 = new PIXI.Application(dom.width() * 2, dom.height() * 2);
        app2.x = dom.width();
        dom.append(app.view);
        dom.append(app2.view);


        drawFirst();
        // drawSecond();
    };


    module.exports = init;
});
