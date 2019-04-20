import {DIRECTION, fulfilled, processMove} from "../util";
import {LOAD_FILE_ACTION, MOVE_ACTION} from "../actions";

export default (state = null, action) => {
    switch (action.type) {
        case fulfilled(LOAD_FILE_ACTION):
            // load new map
            const {map} = action.payload;

            return {map, robots: {}}; // no robots at the start
        case MOVE_ACTION:
            // make a move!
            const {direction, move} = action.payload;
            return processMove(state, move, direction);
        default:
            return state
    }
}