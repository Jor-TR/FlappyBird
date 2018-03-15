
window.onload = function () {
    // //游戏历时
    // this.runTime=0;
    // //如果初始等待时间没到，而且玩家没有触发按键，则不做任何改变;
    // //如果初始等待时间没到，但玩家已经触发按键，则不再等待;
    // if (this.runTime < this.parameters.waitTime) {
    //     if (keyPressed == false) {
    //         return;
    //     } else {
    //         this.runTime = this.parameters.waitTime;
    //     }
    // }
    // //只有当超过等待时间时才开始显现管道
    // if(this.runTime<this.waitTime){
    //     return;
    // }
    //加载游戏数据
    this.gameData = new GameData();
    //获取画布及其上下文
    this.cvs = document.getElementById("cvs");
    this.ctx = cvs.getContext("2d");
    //画布设置
    this.cvs.setAttribute("width", gameData.canvasSize.width);
    this.cvs.setAttribute("height", gameData.canvasSize.height);
    //alert("here");
    //事件处理
    cvs.onclick=mouseClickEvent;//鼠标点击事件
    cvs.onmousemove=mouseMoveEvent;//光标移动事件
    document.onkeydown=keyDownEvent;//玩家按键事件
    //激活游戏
    this.gameModel = new GameModel(gameData);
    //初始化界面
    paintStartImage();
    //定时器ID
    this.timerId;
};

function mouseClickEvent(event){
    //获取光标相对于画布的位置
    let mousePos={
        x:event.clientX-cvs.offsetLeft,
        y:event.clientY-cvs.offsetTop
    };
    //根据当前游戏状态，采取不同行为
    switch(gameModel.gameState){
        case state.START:
            //玩家已经点击开始按钮
             if(inArea(mousePos,gameData.startButtonPos,gameData.startButton.size)){
                //切换至运行状态
                gameModel.switchGameState(state.RUNNING);
                //开启定时器
                timerId=setInterval(intervalEvent,gameData.interval);
             }
            break;
        case state.OVER:
            //玩家已经确认游戏结束，返回开始界面
            if(inArea(mousePos,gameData.okButtonPos,gameData.okButton.size)){
                gameModel.switchGameState(state.START);
                paintStartImage();
            }
            break;
        default:
            break;
    }
}
function keyDownEvent(e){
    //必须处于游戏运行状态才处理键盘事件
    if(gameModel.gameState!==state.RUNNING){
        return;
    }
    //只有玩家触发有效按键(空格)时，小鸟才会上升
    let keyCode =  e.which||e.keyCode;
    if(keyCode===gameData.validKeyCode){
        gameModel.update(true);
    }
}
function intervalEvent(){
    // 监测数据********************************************************************
    // document.getElementById("text").innerHTML=gameModel.birdPos.x+" , "+gameModel.birdPos.y+" : "+gameModel.gameState+"\nDistance: "+gameModel.distance; 
    //更新游戏数据
    gameModel.update(false);
    //检查游戏是否结束
    if(gameModel.checkIfGameOver()===true){
        clearInterval(this.timerId);
        gameModel.switchGameState(state.OVER);
        paintEndImage();
        return;
    }
    //如果还没结束，绘制游戏画面
    paintGameImage(gameModel.birdPos,gameModel.birdState,gameModel.flutterState,gameModel.tubeQueue,gameModel.score);
}

function mouseMoveEvent(event){
    //获取光标相对于画布的位置
    let mousePos={
        x:event.clientX-cvs.offsetLeft,
        y:event.clientY-cvs.offsetTop
    };
    //根据当前游戏状态，采取不同行为
    switch(gameModel.gameState){
        //在开始界面，当光标触及开始按钮时会变成一只手
        case state.START:
            if(inArea(mousePos,gameData.startButtonPos,gameData.startButton.size)){
                cvs.style.cursor="pointer";
            }else{
                cvs.style.cursor="auto";
            }
            break;
        //在结束界面，当光标触及OK按钮时会变成一只手
        case state.OVER:
            if(inArea(mousePos,gameData.okButtonPos,gameData.okButton.size)){
                cvs.style.cursor="pointer";
            }else{
                cvs.style.cursor="auto";
            }
            break;
        default:
            cvs.style.cursor="auto";
            break;
    }
}



