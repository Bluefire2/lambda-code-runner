import {fulfilled} from "../util";
import {Action} from "../actions";

export default (state = false, action) => {
    switch (action.type) {
        case fulfilled(Action.LOAD_FILE_ACTION):
            return true;
        default:
            return state;
    }
};