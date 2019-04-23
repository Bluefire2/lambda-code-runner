import {LOAD_FILE_ACTION} from "../actions";
import {fulfilled} from "../util";

export default (state = {}, action) => {
    switch (action.type) {
        case fulfilled(LOAD_FILE_ACTION):
            const {moves} = action.payload;
            console.log(moves);
            return {moves, next: 0}; // no moves have been run so far
        default:
            return state
    }
}