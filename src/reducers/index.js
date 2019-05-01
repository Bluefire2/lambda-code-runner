import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import boardReducer from "./boardReducer";

const rootReducer = combineReducers({
    form: formReducer,
    board: boardReducer
});

export default rootReducer;