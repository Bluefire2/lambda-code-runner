import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import historyReducer from "./historyReducer";
import boardReducer from "./boardReducer";

const rootReducer = combineReducers({
    form: formReducer,
    history: historyReducer,
    board: boardReducer
});

export default rootReducer;