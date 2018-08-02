export const enums = {

    //游戏状态的枚举
    gameState: {
        START: 0,
        RUNNING: 2,
        OVER: 3,
    },

    // 小鸟的飞行姿态、翅膀姿态
    birdPattern: {
        birdState: { NORMAL: "normal", FALL: "fall", FLY: "fly" },
        flutterState: { MID: "FlutterMid", DOWN: "FlutterDown", UP: "FlutterUp" }
    },

    // 可供调用的action的类型
    actionTypes: {
        MOVE_ON: "MOVE_ON",
        JUMP_UP: "JUMP_UP",
        CHANGE_GAME_STATE: "CHANGE_GAME_STATE",
    }
};