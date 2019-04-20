import {fulfilled} from "../util";
import {LOAD_FILE_ACTION} from "../actions";

export default (state = null, action) => {
    switch (action.type) {
        case fulfilled(LOAD_FILE_ACTION):
            // load new map
            const {map} = action.payload;

            return {map, robots: {}}; // no robots at the start
        default:
            return state
    }
}