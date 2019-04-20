import {fulfilled, processMove} from "../util";
import {LOAD_FILE_ACTION, MOVE_ACTION} from "../actions";

// TODO: document board object schema

export default (state = null, action) => {
    switch (action.type) {
        case fulfilled(LOAD_FILE_ACTION):
            // load new map
            const {map} = action.payload,
                bases = getBases(map);
            return {map, bases, robots: {}}; // no robots at the start
        case MOVE_ACTION:
            // make a move!
            const {direction, move} = action.payload;
            return processMove(state, move, direction);
        default:
            return state
    }
}

/**
 * Get all the team home base locations from a map.
 *
 * @param map The map.
 * @return An object mapping team names to home base locations.
 */
const getBases = map => {
    // TODO: implement
};