import * as funcs from "./modules/functions.js";
import { createStore } from "./modules/my-redux.js";
import { actions } from "./modules/actions.js";
import { reducer } from "./modules/reducer.js";
import { enums } from "./modules/enums.js";
import * as creators from "./modules/creators.js"
import { config } from "./config.js";

window.onload = () => {

    // 画布设置
    const cvs = document.getElementById("cvs");
    cvs.setAttribute("width", config.canvasSize.width);
    cvs.setAttribute("height", config.canvasSize.height);

    // 获取画布的上下文
    const ctx = cvs.getContext("2d");

    // 用redux管理状态
    const store = createStore(reducer, funcs.deepCopy(config.initialState));

    // 每次切换状态时，绑定或者解除绑定各个事件处理程序
    const onStateChange = function (state, oldState) {
        switch (state.gameState) {
            case enums.gameState.RUNNING:
                if (oldState.gameState === enums.gameState.RUNNING) {
                    return;
                }
                cvs.onclick = null;
                cvs.onmousemove = null;
                cvs.style.cursor = "auto";
                const jumpUp = function (event) {
                    document.onkeydown = null;

                    // 只有玩家触发有效按键(空格)时，小鸟才会上升
                    const keyCode = event.which || event.keyCode;
                    if (keyCode === config.validKeyCode) {
                        store.dispatch(actions.jumpUp());
                    }
                };
                document.onkeyup = () => { document.onkeydown = jumpUp };
                document.onkeydown = jumpUp;
                onStateChange.timerId = funcs.setSafeInterval(() => {
                    const state = store.getState();

                    // 检查游戏是否已经结束
                    if ((() => {

                        // 检查每个管道,如果小鸟的坐标处在管道范围内则游戏结束
                        for (let tubeArea of state.tubeAreaArray) {
                            const validArea = {
                                x: tubeArea.x - config.birdSize.width * 9 / 10,
                                y: tubeArea.y - config.birdSize.height * 9 / 10,
                                width: tubeArea.width + config.birdSize.width * 8 / 10,
                                height: tubeArea.height + config.birdSize.height * 8 / 10,
                            }, birdPos = { x: state.birdX, y: state.birdY };
                            if (funcs.pointWithinArea(birdPos, validArea)) {
                                return true;
                            }
                        }
                        if (
                            state.birdY < 0 || //小鸟撞天花板
                            state.birdY > (config.skyHeight - config.birdSize.height) || //小鸟坠地
                            state.score >= config.maxScore //分数到达上限
                        ) {
                            return true;
                        }
                        return false;
                    })() === false) {
                        store.dispatch(actions.moveOn());
                    } else {
                        store.dispatch(actions.changeGameState(enums.gameState.OVER));
                    }
                }, config.interval);
                break;
            case enums.gameState.START:

                // 鼠标点击事件
                cvs.onclick = function (event) {

                    // 获取光标相对于画布的位置
                    let mousePos = {
                        x: event.clientX - funcs.getPageX(cvs),
                        y: event.clientY - funcs.getPageY(cvs)
                    };
                    if (funcs.pointWithinArea(mousePos, config.startButtonArea)) {

                        //切换至运行状态
                        store.dispatch(actions.changeGameState(enums.gameState.RUNNING));
                    }
                };
                cvs.onmousemove = function (event) {

                    // 获取光标相对于画布的位置
                    let mousePos = {
                        x: event.clientX - funcs.getPageX(cvs),
                        y: event.clientY - funcs.getPageY(cvs)
                    };

                    // 在开始界面，当光标触及开始按钮时会变成一只手
                    if (funcs.pointWithinArea(mousePos, config.startButtonArea)) {
                        cvs.style.cursor = "pointer";
                    } else {
                        cvs.style.cursor = "auto";
                    }
                };
                break;
            case enums.gameState.OVER:
                funcs.clearSafeInterval(onStateChange.timerId);
                document.onkeydown = null;
                document.onkeyup = null;
                cvs.onclick = function (event) {

                    // 获取光标相对于画布的位置
                    let mousePos = {
                        x: event.clientX - funcs.getPageX(cvs),
                        y: event.clientY - funcs.getPageY(cvs)
                    };
                    if (funcs.pointWithinArea(mousePos, config.okButtonArea)) {

                        // 切换至运行状态
                        store.dispatch(actions.changeGameState(enums.gameState.START));
                    }
                };
                cvs.onmousemove = (event) => {

                    // 获取光标相对于画布的位置
                    let mousePos = {
                        x: event.clientX - funcs.getPageX(cvs),
                        y: event.clientY - funcs.getPageY(cvs)
                    };

                    // 在结束界面，当光标触及OK按钮时会变成一只手
                    if (funcs.pointWithinArea(mousePos, config.okButtonArea)) {
                        cvs.style.cursor = "pointer";
                    } else {
                        cvs.style.cursor = "auto";
                    }
                };
                break;
            default:
                throw new Error("unknown game state!");
        }
    };

    // store订阅函数
    store.subscribe(onStateChange);

    // 绘制游戏图像用的函数
    const draw = funcs.curry(funcs.drawPromises, ctx),
        paintStartImage = funcs.curry(draw, [
            creators.createBackground(config),
            creators.createStartButton(config),
            creators.createTitle(config)
        ]),
        paintOverImage = funcs.curry(draw, [
            creators.createOkButton(config),
            creators.createGameOver(config)
        ]);

    // 根据当前状态绘制游戏图像(循环)
    const paint = function () {
        const state = store.getState();
        switch (state.gameState) {
            case enums.gameState.RUNNING:
                draw([
                    creators.createBackground(config),
                    ...state.tubeAreaArray.map((tubeArea, index) => {
                        if (index % 2 === 0) {
                            return creators.createUpTube(config, tubeArea);
                        } else {
                            return creators.createDownTube(config, tubeArea);
                        }
                    }),
                    creators.createBird(config, state),
                    creators.createScoreLeft(config, state),
                    creators.createScoreRight(config, state),
                ]);
                break;
            case enums.gameState.START:
                paintStartImage();
                break;
            case enums.gameState.OVER:
                paintOverImage();
                break;
            default:
                throw new Error("unknown game state!");
        }
        requestAnimationFrame(paint);
        // setTimeout(paint,config.interval);
    };

    // 启动游戏
    onStateChange(store.getState());
    paint();
};
