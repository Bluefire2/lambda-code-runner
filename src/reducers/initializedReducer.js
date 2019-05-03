import {fulfilled} from "../util";
import {LOAD_FILE_ACTION} from "../actions";

export default (state = false, action) => {
    switch (action.type) {
        case fulfilled(LOAD_FILE_ACTION):
            return true;
        default:
            return state;
    }
};