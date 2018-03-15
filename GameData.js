
//游戏状态的枚举
var state={
    START:0,
    //WAITTING:1,
    RUNNING:2,
    OVER:3,
    //END:4
};

function GameData(){
    //游戏参数
    this.interval=30;//游戏图像刷新的间隔时间(毫秒)
    this.gravity=8;//引力系数
    this.upJumpSpeed=-30;//小鸟上升时的初速度
    this.tubeDeltaX=2;//管道每次前进的距离
    this.validKeyCode=32;//有效按键的编码(空格键)
    this.birdSlowFactor=100;//减缓小鸟垂直运动的速度
    this.flutterSlowFactor=5;//经过几次刷新才扇动一次翅膀
    this.birdStartPos={x:200,y:100};//小鸟初始位置
    this.waveWidth=180;//管道横向间距
    this.tubeGap=200;//管道纵向间距
    this.skyHeight=600;//天空的高度
    this.maxScore=99;//允许的最高得分
    //this.tubeWaitTime=200;//游戏开始前的等待时间

    //特殊尺寸
    this.canvasSize={width:500,height:600};
    this.birdSize={width:34,height:34};
    this.scoreSize={width:24,height:36};
    this.tubeWidth=52;
    this.tubeMaxHeight=320;
    this.minHeight = this.skyHeight - this.tubeGap - this.tubeMaxHeight;
    this.maxHeight = this.skyHeight - this.tubeGap - Math.floor(this.tubeMaxHeight / 10);
    this.birdPattern={
      birdState:{normal:"normal",fall:"fall",fly:"fly"},
      flutterState:{mid:"FlutterMid",down:"FlutterDown",up:"FlutterUp"}
    };

    //所有图片的路径以及尺寸
    this.empty={path:"BirdImage/texture/empty.png",size:{width:24,height:36}};
    this.score0={path:"BirdImage/texture/0.png",size:{width:24,height:36}};
    this.score1={path:"BirdImage/texture/1.png",size:{width:24,height:36}};
    this.score2={path:"BirdImage/texture/2.png",size:{width:24,height:36}};
    this.score3={path:"BirdImage/texture/3.png",size:{width:24,height:36}};
    this.score4={path:"BirdImage/texture/4.png",size:{width:24,height:36}};
    this.score5={path:"BirdImage/texture/5.png",size:{width:24,height:36}};
    this.score6={path:"BirdImage/texture/6.png",size:{width:24,height:36}};
    this.score7={path:"BirdImage/texture/7.png",size:{width:24,height:36}};
    this.score8={path:"BirdImage/texture/8.png",size:{width:24,height:36}};
    this.score9={path:"BirdImage/texture/9.png",size:{width:24,height:36}};
    this.white={path:"BirdImage/texture/white.png",size:{width:19,height:20}};
    this.fallFlutterDown={path:"BirdImage/texture/fallFlutterDown.png",size:{width:34,height:34}};
    this.fallFlutterMid={path:"BirdImage/texture/fallFlutterMid.png",size:{width:34,height:34}};
    this.fallFlutterUp={path:"BirdImage/texture/fallFlutterUp.png",size:{width:34,height:34}};
    this.flyFlutterDown={path:"BirdImage/texture/flyFlutterDown.png",size:{width:34,height:34}};
    this.flyFlutterMid={path:"BirdImage/texture/flyFlutterMid.png",size:{width:34,height:34}};
    this.flyFlutterUp={path:"BirdImage/texture/flyFlutterUp.png",size:{width:34,height:34}};
    this.normalFlutterDown={path:"BirdImage/texture/normalFlutterDown.png",size:{width:34,height:34}};
    this.normalFlutterMid={path:"BirdImage/texture/normalFlutterMid.png",size:{width:34,height:34}};
    this.normalFlutterUp={path:"BirdImage/texture/normalFlutterUp.png",size:{width:34,height:34}};
    this.background={path:"BirdImage/texture/background.png",size:{width:288,height:512}};
    this.downTube={path:"BirdImage/texture/downTube.png",size:{width:52,height:320}};
    this.upTube={path:"BirdImage/texture/upTube.png",size:{width:52,height:320}};
    this.gameOver={path:"BirdImage/texture/gameOver.png",size:{width:192,height:192}};
    this.okButton={path:"BirdImage/texture/okButton.png",size:{width:80,height:28}};
    this.startButton={path:"BirdImage/texture/startButton.png",size:{width:104,height:58}};
    this.title={path:"BirdImage/texture/title.png",size:{width:178,height:48}};
    this.ground={path:"BirdImage/texture/ground.png",size:{width:659,height:650}};


    //位置固定的图片的加载位置
    this.backgroundPos={x:0,y:0};
    this.gameOverPos={
        x:(this.canvasSize.width-this.gameOver.size.width)/2,
        y:this.canvasSize.height/8
    };
    this.titlePos={
        x:(this.canvasSize.width-this.title.size.width)/2,
        y:this.canvasSize.height/6
    };
    this.startButtonPos={
        x:(this.canvasSize.width-this.startButton.size.width)/2,
        y:this.canvasSize.height/3
    };
    this.okButtonPos={
        x:(this.canvasSize.width-this.okButton.size.width)/2,
        y:this.canvasSize.height/2
    };
    this.num1Pos={
        x:(this.canvasSize.width-2*this.score0.size.width-5)/2,
        y:25
    };
    this.num2Pos={
        x:this.num1Pos.x+this.score0.size.width+5,
        y:25
    };
}
