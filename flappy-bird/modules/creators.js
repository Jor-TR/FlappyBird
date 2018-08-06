import * as funcs from "./functions.js";

/* 
 *各个函数用于生成对游戏中某种物体的绘画所需的信息对象的promise，
 *多个promise组合成数组之后传入functions.js模块中的drawPromises函数就可以生成一帧游戏图像；
 *完整的信息对象结构如下：
let object = {
    image: new Image(),
    s: {
        sX: 0,
        sY: 0,
        sWidth: 0,
        sHeight: 0,
    },
    d: {
        dX: 0,
        dY: 0,
        dWidth: 0,
        dHeight: 0,
    },
}
*/ 
export const createScoreLeft = (config, state) => {
    const { score } = state,
        [scoreLeft, scoreRight] = funcs.splitScore(score);
    const scoreLeftObject = {
        image: new Image(),
        d: {
            dX: config.scoreLeftPos.x,
            dY: config.scoreLeftPos.y,
        }
    };
    return new Promise(
        (resolve,reject)=>{
            scoreLeftObject.image.onload=()=>{
                resolve(scoreLeftObject);
            };
            scoreLeftObject.image.onerror=()=>{
                reject();
            };
            scoreLeftObject.image.src = config["score" + scoreLeft].path;
        }
    );
};

export const createScoreRight = (config, state) => {
    const { score } = state,
        [scoreLeft, scoreRight] = funcs.splitScore(score);
    const scoreRightObject = {
        image: new Image(),
        d: {
            dX: config.scoreRightPos.x,
            dY: config.scoreRightPos.y,
        }
    };
    return new Promise(
        (resolve,reject)=>{
            scoreRightObject.image.onload=()=>{
                resolve(scoreRightObject);
            };
            scoreRightObject.image.onerror=()=>{
                reject();
            };
            scoreRightObject.image.src = config["score" + scoreRight].path;
        }
    );
};

export const createBird = (config,state) => {
    const { birdX, birdY, birdState, flutterState } = state;
    const bird = {
        image: new Image(),
        d: {
            dX: birdX,
            dY: birdY,
        },
    };
    return new Promise(
        (resolve,reject)=>{
            bird.image.onload=()=>{
                resolve(bird);
            };
            bird.image.onerror=()=>{
                reject();
            };
            bird.image.src = config[birdState + flutterState].path;
        }
    );
};

export const createUpTube = (config, upTubeArea) => {

    const { tubeMaxHeight, tubeWidth, upTube } = config;

    //生成新管道
    const upTubeObject= {
        image: new Image(),
        s: {
            sX: 0,
            sY: tubeMaxHeight - upTubeArea.height,
            sWidth: tubeWidth,
            sHeight: upTubeArea.height,
        },
        d: {
            dX: upTubeArea.x,
            dY: upTubeArea.y,
            dWidth:upTubeArea.width,
            dHeight:upTubeArea.height,
        }
    };
    return new Promise(
        (resolve,reject)=>{
            upTubeObject.image.onload=()=>{
                resolve(upTubeObject);
            };
            upTubeObject.image.onerror=()=>{
                reject();
            };
            upTubeObject.image.src = upTube.path;
        }
    );
};

export const createDownTube = (config, downTubeArea) => {

    const { tubeWidth, downTube } = config;

    //生成新管道
    const downTubeObject = {
        image: new Image(),
        s: {
            sX: 0,
            sY: 0,
            sWidth: tubeWidth,
            sHeight: downTubeArea.height,
        },
        d: {
            dX: downTubeArea.x,
            dY: downTubeArea.y,
            dWidth:downTubeArea.width,
            dHeight:downTubeArea.height,
        }
    };
    return new Promise(
        (resolve,reject)=>{
            downTubeObject.image.onload=()=>{
                resolve(downTubeObject);
            };
            downTubeObject.image.onerror=()=>{
                reject();
            };
            downTubeObject.image.src = downTube.path;
        }
    );
};

export const createBackground=(config)=>{
    const { backgroundPos,canvasSize,background }=config;
    const backgroundObject={
        image:new Image(),
        d:{
            dX:backgroundPos.x,
            dY:backgroundPos.y,
            dWidth:canvasSize.width,
            dHeight:canvasSize.height,
        }
    };
    return new Promise(
        (resolve,reject)=>{
            backgroundObject.image.onload=()=>{
                resolve(backgroundObject);
            };
            backgroundObject.image.onerror=()=>{
                reject();
            };
            backgroundObject.image.src = background.path;
        }
    );
};

export const createTitle=(config)=>{
    const { title,titlePos } =config;
    const titleObject={
        image:new Image(),
        d:{
            dX:titlePos.x,
            dY:titlePos.y,
        }
    };
    return new Promise(
        (resolve,reject)=>{
            titleObject.image.onload=()=>{
                resolve(titleObject);
            };
            titleObject.image.onerror=()=>{
                reject();
            };
            titleObject.image.src=title.path;
        }
    );
};

export const createStartButton=(config)=>{
    const { startButton,startButtonArea }=config;
    const startButtonObject={
        image:new Image(),
        d:{
            dX:startButtonArea.x,
            dY:startButtonArea.y,
        }
    };
    return new Promise(
        (resolve,reject)=>{
            startButtonObject.image.onload=()=>{
                resolve(startButtonObject);
            };
            startButtonObject.image.onerror=()=>{
                reject();
            };
            startButtonObject.image.src=startButton.path;
        }
    );
};

export const createGameOver=(config)=>{
    const { gameOver,gameOverPos }=config;
    const gameOverObject={
        image:new Image(),
        d:{
            dX:gameOverPos.x,
            dY:gameOverPos.y,
        }
    };
    return new Promise(
        (resolve,reject)=>{
            gameOverObject.image.onload=()=>{
                resolve(gameOverObject);
            };
            gameOverObject.image.onerror=()=>{
                reject();
            };
            gameOverObject.image.src=gameOver.path;
        }
    );
};

export const createOkButton=(config)=>{
    const { okButton,okButtonArea } =config;
    const okButtonObject={
        image:new Image(),
        d:{
            dX:okButtonArea.x,
            dY:okButtonArea.y
        }
    };
    return new Promise(
        (resolve,reject)=>{
            okButtonObject.image.onload=()=>{
                resolve(okButtonObject);
            };
            okButtonObject.image.onerror=()=>{
                reject();
            }
            okButtonObject.image.src=okButton.path;
        }
    );
};

