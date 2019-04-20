import {LOAD_FILE_ACTION} from "../actions";
import {fulfilled} from "../util";

export default (state = null, action) => {
    switch (action.type) {
        case fulfilled(LOAD_FILE_ACTION):
            const {moves: history} = action.payload;
            console.log(history);
            return {history, next: 0}; // no moves have been run so far
        default:
            return state
    }
}