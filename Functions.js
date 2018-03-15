
//深度拷贝函数
function clone(obj) {
    if (typeof obj !== "object") {
        return obj;
    }
    if (obj instanceof Array) {
        newObject = [];
    } else {
        newObject = {}
    }
    for (var key in obj) {
        newObject[key] = arguments.callee(obj[key]);
    }
    return newObject;
}

//加载图片至画布
function paintCanvas(img, tPos, tSize, rPos, rSize) {
    //校验实参
    if (typeof img !== "string") {
        return;
    }
    if (typeof tPos.x !== "number" || typeof tPos.y !== "number") {
        return;
    }
    //加载图片，并用事件处理函数将图片放置到画布
    let image = new Image();
    if (arguments.length === 2) {
        //图片加载完成后，用事件处理函数加载至画布
        image.onload = function () {
            ctx.drawImage(image, tPos.x, tPos.y);
        };
    } else if (arguments.length === 3) {
        //校验实参
        if (typeof tSize.width !== "number" || typeof tSize.height !== "number") {
            return;
        }
        //图片加载完成后，用事件处理函数加载至画布
        image.onload = function () {
            ctx.drawImage(image, tPos.x, tPos.y, tSize.width, tSize.height);
        };
    } else if (arguments.length === 5) {
        //校验实参
        if (typeof tSize.width !== "number" || typeof tSize.height !== "number") {
            return;
        }
        if (typeof rPos.x !== "number" || typeof rPos.y !== "number") {
            return;
        }
        if (typeof rSize.width !== "number" || typeof rSize.height !== "number") {
            return;
        }
        //图片加载完成后，用事件处理函数加载至画布
        image.onload = function () {
            ctx.drawImage(image, rPos.x, rPos.y, rSize.width, rSize.height, tPos.x, tPos.y, tSize.width, tSize.height);
        };
    } else {
        return;
    }
    image.src = gameData[img].path;
}

//绘制游戏开始界面
function paintStartImage() {
    paintCanvas("background", gameData.backgroundPos, gameData.canvasSize);
    paintCanvas("title", gameData.titlePos);
    paintCanvas("startButton", gameData.startButtonPos);
}

//绘制游戏结束界面
function paintEndImage() {
    paintCanvas("gameOver", gameData.gameOverPos);
    paintCanvas("okButton", gameData.okButtonPos);
}

//绘制游戏运行时的界面
function paintGameImage(birdPos, birdState, flutterState, tubeQueue, score) {

    //背景
    paintCanvas("background", gameData.backgroundPos, gameData.canvasSize);

    //小鸟
    paintCanvas(birdState + flutterState, birdPos);

    //管道
    for (let n = 0; n < tubeQueue.length; n++) {
        let rPosUp = {
            x: 0,
            y: gameData.tubeMaxHeight - tubeQueue[n].upTubeHeight
        };
        let rSizeUp = {
            width: gameData.tubeWidth,
            height: tubeQueue[n].upTubeHeight
        };
        let tPosUp = {
            x: tubeQueue[n].upTubeX,
            y: tubeQueue[n].upTubeY
        };
        paintCanvas("upTube", tPosUp, rSizeUp, rPosUp, rSizeUp);

        let rPosDown = {
            x: 0,
            y: 0
        };
        let rSizeDown = {
            width: tubeQueue[n].tubeWidth,
            height: tubeQueue[n].downTubeHeight,
        };
        let tPosDown = {
            x: tubeQueue[n].downTubeX,
            y: tubeQueue[n].downTubeY
        };
        paintCanvas("downTube", tPosDown, rSizeDown, rPosDown, rSizeDown);
    }
    //分数
    let num1 = Math.floor(score / 10);
    let num2 = score % 10;
    paintCanvas("score" + num1, gameData.num1Pos);
    paintCanvas("score" + num2, gameData.num2Pos);
};

//判断某个点point是否处于某个区域内
function inArea(point, pos, size) {
    if (point.x >= pos.x && point.x <= (pos.x + size.width) &&
        point.y >= pos.y && point.y <= (pos.y + size.height)) {
        return true;
    } else {
        return false;
    }
}


