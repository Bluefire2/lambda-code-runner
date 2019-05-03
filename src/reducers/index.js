import {combineReducers} from 'redux';
import boardReducer from "./boardReducer";
import gameStatusReducer from "./gameStatusReducer";

const rootReducer = combineReducers({
    board: boardReducer,
    gameStatus: gameStatusReducer
});

export default rootReducer;