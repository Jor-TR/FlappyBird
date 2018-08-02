import { enums } from "./modules/enums.js";

function GameConfig(){

    // 游戏初始化状态
    this.initialState = {
        distance: 0, // 管道队列已前进的距离
        fallSpeed: 0, // 鸟的下坠速度
        gameState: enums.gameState.START, // 游戏处于何种状态
        score: 0, // 游戏得分
        tubeAreaArray: [], // 管道对信息
        birdX: 200, // 鸟的坐标
        birdY: 100, // 鸟的坐标
        birdState: enums.birdPattern.birdState.NORMAL, // 小鸟飞行姿态
        flutterState: enums.birdPattern.flutterState.MID, // 小鸟翅膀姿态
    };

    //游戏参数
    this.interval = 30; // 游戏图像刷新的间隔时间(毫秒)
    this.tubeMoveSpeed = 2; // 管道每次前进的距离
    this.waveDistance = 180; // 管道周期间距
    this.gravity = 0.6; // 引力系数
    this.upJumpSpeed = -9; // 小鸟上升时的初速度
    this.validKeyCode = 32; // 有效按键的编码(空格键)
    this.tubeGap = 200; // 管道纵向间距
    this.skyHeight = 600; // 天空的高度
    this.maxScore = 99; // 允许的最高得分
    this.flutterChangeInterval=100; // 每经过多少毫秒扇动一下翅膀
    // this.tubeWaitTime=200;//游戏开始前的等待时间

    // 特殊尺寸
    this.canvasSize = { width: 500, height: 600 };
    this.birdSize = { width: 34, height: 34 };
    this.scoreSize = { width: 24, height: 36 };
    this.tubeWidth = 52;
    this.tubeMaxHeight = 320;
    this.minHeight = this.skyHeight - this.tubeGap - this.tubeMaxHeight;
    this.maxHeight = this.skyHeight - this.tubeGap - Math.floor(this.tubeMaxHeight / 10);

    // 所有图片的路径以及尺寸
    this.empty = { path: "bird-images/texture/empty.png", size: { width: 24, height: 36 } };
    this.score0 = { path: "bird-images/texture/0.png", size: { width: 24, height: 36 } };
    this.score1 = { path: "bird-images/texture/1.png", size: { width: 24, height: 36 } };
    this.score2 = { path: "bird-images/texture/2.png", size: { width: 24, height: 36 } };
    this.score3 = { path: "bird-images/texture/3.png", size: { width: 24, height: 36 } };
    this.score4 = { path: "bird-images/texture/4.png", size: { width: 24, height: 36 } };
    this.score5 = { path: "bird-images/texture/5.png", size: { width: 24, height: 36 } };
    this.score6 = { path: "bird-images/texture/6.png", size: { width: 24, height: 36 } };
    this.score7 = { path: "bird-images/texture/7.png", size: { width: 24, height: 36 } };
    this.score8 = { path: "bird-images/texture/8.png", size: { width: 24, height: 36 } };
    this.score9 = { path: "bird-images/texture/9.png", size: { width: 24, height: 36 } };
    this.white = { path: "bird-images/texture/white.png", size: { width: 19, height: 20 } };
    this.fallFlutterDown = { path: "bird-images/texture/fallFlutterDown.png", size: { width: 34, height: 34 } };
    this.fallFlutterMid = { path: "bird-images/texture/fallFlutterMid.png", size: { width: 34, height: 34 } };
    this.fallFlutterUp = { path: "bird-images/texture/fallFlutterUp.png", size: { width: 34, height: 34 } };
    this.flyFlutterDown = { path: "bird-images/texture/flyFlutterDown.png", size: { width: 34, height: 34 } };
    this.flyFlutterMid = { path: "bird-images/texture/flyFlutterMid.png", size: { width: 34, height: 34 } };
    this.flyFlutterUp = { path: "bird-images/texture/flyFlutterUp.png", size: { width: 34, height: 34 } };
    this.normalFlutterDown = { path: "bird-images/texture/normalFlutterDown.png", size: { width: 34, height: 34 } };
    this.normalFlutterMid = { path: "bird-images/texture/normalFlutterMid.png", size: { width: 34, height: 34 } };
    this.normalFlutterUp = { path: "bird-images/texture/normalFlutterUp.png", size: { width: 34, height: 34 } };
    this.background = { path: "bird-images/texture/background.png", size: { width: 288, height: 512 } };
    this.downTube = { path: "bird-images/texture/downTube.png", size: { width: 52, height: 320 } };
    this.upTube = { path: "bird-images/texture/upTube.png", size: { width: 52, height: 320 } };
    this.gameOver = { path: "bird-images/texture/gameOver.png", size: { width: 192, height: 192 } };
    this.okButton = { path: "bird-images/texture/okButton.png", size: { width: 80, height: 28 } };
    this.startButton = { path: "bird-images/texture/startButton.png", size: { width: 104, height: 58 } };
    this.title = { path: "bird-images/texture/title.png", size: { width: 178, height: 48 } };
    this.ground = { path: "bird-images/texture/ground.png", size: { width: 659, height: 650 } };


    // 位置固定的图片的加载位置
    this.backgroundPos = { x: 0, y: 0 };
    this.gameOverPos = {
        x: (this.canvasSize.width - this.gameOver.size.width) / 2,
        y: this.canvasSize.height / 8
    };
    this.titlePos = {
        x: (this.canvasSize.width - this.title.size.width) / 2,
        y: this.canvasSize.height / 6
    };
    this.startButtonArea = {
        x: (this.canvasSize.width - this.startButton.size.width) / 2,
        y: this.canvasSize.height / 3,
        width:this.startButton.size.width,
        height:this.startButton.size.height,
    };
    this.okButtonArea = {
        x: (this.canvasSize.width - this.okButton.size.width) / 2,
        y: this.canvasSize.height / 2,
        width:this.okButton.size.width,
        height:this.okButton.size.height,
    };
    this.scoreLeftPos = {
        x: (this.canvasSize.width - 2 * this.score0.size.width - 5) / 2,
        y: 25
    };
    this.scoreRightPos = {
        x: this.scoreLeftPos.x + this.score0.size.width + 5,
        y: 25
    };
}

export const config = new GameConfig();
