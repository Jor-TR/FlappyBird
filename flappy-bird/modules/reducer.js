import { config } from "../config.js";
import { enums } from "./enums.js";
import * as funcs from "./functions.js";

export const reducer=(state={},action)=>{
    switch(action.type){
        case enums.actionTypes.CHANGE_GAME_STATE:
            if(action.newState===enums.gameState.START){
                return funcs.deepCopy(config.initialState);
            }else{
                return {
                    ...state,
                    gameState: action.newState
                };
            }
        case enums.actionTypes.MOVE_ON:
            const newState = {
                ...state,
            };

            newState.birdY += newState.fallSpeed; // 小鸟下落或上升
            newState.fallSpeed += config.gravity; // 由于重力加速度，小鸟速度发生变化

            // 调整小鸟的姿态
            if(newState.fallSpeed>0){
                newState.birdState=enums.birdPattern.birdState.FALL;
            }else if(newState.fallSpeed<0){
                newState.birdState=enums.birdPattern.birdState.FLY;
            }else{
                newState.birdState=enums.birdPattern.birdState.NORMAL;
            }
            // 调整小鸟的翅膀
            const runTime=newState.distance/config.tubeMoveSpeed*config.interval,
                flutterChangeTimes=Math.floor(runTime/config.flutterChangeInterval);
            switch(flutterChangeTimes%3){
                case 0:
                    newState.flutterState=enums.birdPattern.flutterState.MID;
                    break;
                case 1:
                    newState.flutterState=enums.birdPattern.flutterState.DOWN;
                    break;
                case 2:
                    newState.flutterState=enums.birdPattern.flutterState.UP;
                    break;
            }

            // 清除掉超出左侧边界的管道
            if (newState.tubeAreaArray.length > 0 && newState.tubeAreaArray[0].x <= (-config.tubeWidth)) {
                newState.tubeAreaArray.shift();
                newState.tubeAreaArray.shift();
            }

            // 每当经过一个波长距离，就生成一对新管道
            if (Math.floor(newState.distance) % config.waveDistance === 0) {

                // 用随机数引擎生成下一出现的上端管道长度
                let height;
                do {
                    height = Math.random() * (config.tubeMaxHeight * 2 / 3) + config.tubeMaxHeight / 6;
                    height = Math.floor(height);
                } while (height < config.minHeight || height > config.maxHeight);
                newState.tubeAreaArray.push(
                    {
                        x: config.canvasSize.width,
                        y: 0,
                        width: config.tubeWidth,
                        height: height,
                    },
                    {
                        x: config.canvasSize.width,
                        y: height + config.tubeGap,
                        width: config.tubeWidth,
                        height: config.skyHeight - height - config.tubeGap,
                    }
                );
            }

            // 所有管道左移
            newState.distance += config.tubeMoveSpeed;
            for (let tubeArea of newState.tubeAreaArray) {
                tubeArea.x -= config.tubeMoveSpeed;
            }

            // 更新分数
            let waveNum= Math.floor((newState.distance - (config.canvasSize.width - newState.birdX) +(config.waveDistance - config.tubeWidth)) / config.waveDistance);
            newState.score =waveNum<0?0:waveNum; 
            // newState.score=1;
            return newState;

        case enums.actionTypes.JUMP_UP:
            return {
                ...state,
                fallSpeed: config.upJumpSpeed,
            };
        default:
            return state;
    }
};

const tubeAreaArrayReducer = (state = [], action) => {
    switch (action.type) {
        case enums.actionTypes.MOVE_ON:


        default:
            return state;
    }
};