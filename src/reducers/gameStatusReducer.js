import {fulfilled} from "../util";
import {Action} from "../actions";

export default (state = {initialized: false, play: false}, action) => {
    switch (action.type) {
        case fulfilled(Action.LOAD_FILE_ACTION):
            const {play} = state;
            return {initialized: true, play};
        default:
            return state;
    }
};