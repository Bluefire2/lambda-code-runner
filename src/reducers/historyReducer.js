import {LOAD_FILE_ACTION} from "../actions";
import {fulfilled} from "../util";

export default (state = null, action) => {
    switch (action.type) {
        case fulfilled(LOAD_FILE_ACTION):
            // console.log("file loaded");
            // TODO: parse file into history object
            return state;
        default:
            return state
    }
}