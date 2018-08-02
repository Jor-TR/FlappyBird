import { enums } from "./enums.js";

export const actions={
    moveOn:()=>({
        type:enums.actionTypes.MOVE_ON,
    }),
    jumpUp:()=>({
        type:enums.actionTypes.JUMP_UP,
    }),
    changeGameState:(newState)=>({
        type:enums.actionTypes.CHANGE_GAME_STATE,
        newState,
    })
};