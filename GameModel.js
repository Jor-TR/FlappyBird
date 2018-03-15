function GameModel(gameData) {
    /***操作接口***/
    this.switchGameState = function (stt) {
        this.gameState = stt;
        //回到开始菜单重置数据
        if (this.gameState === state.START) {
            this.reset();
        }
    };


    this.update = function (keyPressed) {
        //校验实参
        if (typeof keyPressed != "boolean") {
            return;
        }
        //如果游戏未在运行，则不再刷新
        if (this.gameState != state.RUNNING) {
            return;
        }
        //图像刷新次数++
        this.runTimes++;
        //更新分数
        this.score = Math.floor((this.distance - (gameData.canvasSize.width - this.birdPos.x - (gameData.waveWidth - gameData.tubeWidth))) / gameData.waveWidth);
        //移动管道
        this.moveTube();
        //移动小鸟
        this.moveBird(keyPressed);
        //改变小鸟翅膀姿态
        if (this.runTimes % this.gameData.flutterSlowFactor === 0) {
            this.switchFlutterState();
        }
    };

    /***私有函数***/
    this.moveBird = function (keyPressed) {
        //校验实参
        if (typeof keyPressed != "boolean") {
            return;
        }
        //小鸟下坠速度变化
        if (keyPressed) {
            this.fallSpeed = this.gameData.upJumpSpeed;
        } else {
            this.fallSpeed += this.gameData.gravity * this.gameData.interval / this.gameData.birdSlowFactor;
        }
        //小鸟姿态
        if (this.fallSpeed > 0) {
            this.birdState = this.gameData.birdPattern.birdState.fall;
        }
        else if (this.fallSpeed < 0) {
            this.birdState = this.gameData.birdPattern.birdState.fly;
        }
        else {
            this.birdState = this.gameData.birdPattern.birdState.normal;
        }
        //小鸟垂直位置变化
        this.birdPos.y += Math.floor(this.fallSpeed * this.gameData.interval / this.gameData.birdSlowFactor);
    };
    //移动管道
    this.moveTube = function () {
        //队列整体左移
        this.distance += this.gameData.tubeDeltaX;
        //每当经过一个波长距离，就生成一个新管道
        if (Math.floor(this.distance) % this.gameData.waveWidth === 0) {
            this.createTube();
        }
        //更新管道队列
        for (let n = 0; n < this.tubeQueue.length; n++) {
            this.tubeQueue[n].upTubeX -= this.gameData.tubeDeltaX;
            this.tubeQueue[n].downTubeX -= this.gameData.tubeDeltaX;
        }
        //清除掉超出左侧边界的管道
        if (this.tubeQueue.length > 0 && this.tubeQueue[0].upTubeX <= (-this.gameData.tubeWidth)) {
            this.tubeQueue.shift();
        }
    };
    this.switchFlutterState = function () {
        switch (this.flutterState) {
            case this.gameData.birdPattern.flutterState.mid:
                this.flutterState = this.gameData.birdPattern.flutterState.up;
                break;
            case this.gameData.birdPattern.flutterState.down:
                this.flutterState = this.gameData.birdPattern.flutterState.mid;
                break;
            case this.gameData.birdPattern.flutterState.up:
                this.flutterState = this.gameData.birdPattern.flutterState.down;
                break;
            default:
                break;
        }
    };

    this.reset = function () {
        /***核心数据***/
        //游戏得分
        this.score = 0;
        //鸟的坐标
        this.birdPos = {
            x: this.gameData.birdStartPos.x,
            y: this.gameData.birdStartPos.y
        };
        //鸟的下坠速度
        this.fallSpeed = 0;
        //小鸟飞行姿态
        this.birdState = this.gameData.birdPattern.birdState.normal;
        //小鸟翅膀姿态
        this.flutterState = this.gameData.birdPattern.flutterState.mid;
        //管道信息
        this.tubeQueue = [];
        //生成第一组管道
        this.createTube();

        /***中间变量***/
        //小鸟前进的距离
        this.distance = 0;
        //游戏运行时图像刷新的次数
        this.runTimes = 0;
        //随机数引擎
        // this.e=new Date().getTime();
    };
    //检查游戏是否已经结束
    this.checkIfGameOver = function () {
        //小鸟碰到管道
        for (let index in this.tubeQueue) {
            //检查每个管道,如果小鸟的坐标处在管道范围内则游戏结束
            if (
                this.birdPos.x > (this.tubeQueue[index].upTubeX - this.gameData.birdSize.width) &&
                this.birdPos.x < (this.tubeQueue[index].upTubeX + this.gameData.birdSize.width) && (
                    this.birdPos.y < this.tubeQueue[index].upTubeHeight ||
                    this.birdPos.y > (this.tubeQueue[index].upTubeHeight + this.gameData.tubeGap - this.gameData.birdSize.height)
                )) {
                return true;
            }
        }
        //小鸟撞天花板
        if (this.birdPos.y <= 0) {
            return true;
            //y=0;
        }
        //小鸟坠地
        if (this.birdPos.y > (this.gameData.skyHeight - this.gameData.birdSize.height)) {
            return true;
            //y=(skyHeight-birdHeight);
        }
        //分数到达上限
        if (this.score >= this.gameData.maxScore) {
            return true;
        }
        return false;
    };



    this.createTube = function () {
        //用随机数引擎生成下一出现的上端管道长度
        let height;
        do {
            height = Math.random() * (this.gameData.tubeMaxHeight * 2 / 3) + this.gameData.tubeMaxHeight / 6;
            height=Math.floor(height);
        } while (height < this.gameData.minHeight || height > this.gameData.maxHeight);
        //生成新管道，并推入队列
        var tubePair = {};
        tubePair.upTubeX = this.gameData.canvasSize.width;
        tubePair.upTubeY = 0;
        tubePair.upTubeHeight = height;
        tubePair.downTubeX = tubePair.upTubeX;
        tubePair.downTubeY = tubePair.upTubeHeight + this.gameData.tubeGap;
        tubePair.downTubeHeight = this.gameData.skyHeight - tubePair.downTubeY;
        tubePair.tubeWidth = this.gameData.tubeWidth;
        this.tubeQueue.push(tubePair);
    };
    /***初始化数据***/
    this.gameData = gameData;
    this.switchGameState(state.START);
}