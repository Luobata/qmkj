define(function (require, exports, module) {
    var app;
    var content;
    var bg = [];
    var bg2 = [];
    var boy;
    var girl;
    var complete;
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
        boat.y = 205 * rate;
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
        timer = 0;

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

        boy.x = 210 * rate;
        boy.y = 335 * rate;
        
        leftC.addChild(desert);
        leftC.addChild(girl);
        leftC.addChild(leftT);
        leftC.addChild(textL);
        rightC.addChild(castle);
        rightC.addChild(leftR);
        rightC.addChild(textR);
        rightC.addChild(boy);

        leftC.alpha = 0;
        rightC.alpha = 0;

        bg.push(leftC);
        bg2.push(rightC);

        app.stage.addChild(leftC);
        app2.stage.addChild(rightC);

        timer = 0;
        timer2 = 0;

        ticker.add(function (time) {
            timer++;
            boyWalk(girl);
            boyWalk(boy);
            girl.x += 1.8;
            boy.x -= 1.8;
            leftC.x -= 1;
            leftT.x += 1;
            textL.x += 1;
            rightC.x += 1;
            leftR.x -= 1;
            textR.x -= 1;

            if (bg[0].alpha > 0 && bg[1].alpha < 1) {
                bg[0].alpha -= 0.005;
                bg[1].alpha += 0.005;
                bg2[0].alpha -= 0.005;
                bg2[1].alpha += 0.005;
            } else if (girl.x < content.width() * 3) {
            //} else if (girl.x  < 0) {
                timer2++;
            } else {
                ticker.stop();
                ticker.remove();
                complete && complete();
                $('canvas').fadeOut(1000, function () {
                    $('canvas').remove();
                });
                    //app.destroy(app);
                    //app2.destroy(app2);
            }
        });
        ticker.start();
    };

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
        boy = new PIXI.Container();
        girl = new PIXI.Container();
        createPepple(boy, 'boy');
        createGirl(girl, 'girl');
        bg = [];
        bg2 = [];
        complete = fn;


        app = new PIXI.Application(dom.width() * 2, dom.height() * 2);
        app2 = new PIXI.Application(dom.width() * 2, dom.height() * 2);
        app2.x = dom.width();
        dom.append(app.view);
        dom.append(app2.view);


        drawFirst();
        //drawSecond();
    };


    module.exports = init;
});
