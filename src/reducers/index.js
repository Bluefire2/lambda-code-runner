import {combineReducers} from 'redux';
import boardReducer from "./boardReducer";
import initializedReducer from "./initializedReducer";

const rootReducer = combineReducers({
    board: boardReducer,
    initialized: initializedReducer
});

export default rootReducer;