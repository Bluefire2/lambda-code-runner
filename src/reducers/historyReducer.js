import {Cmd, loop} from "redux-loop";

import {LOAD_FILE_ACTION, runMove, SEQUENTIAL_MOVE_ACTION} from "../actions";
import {fulfilled} from "../util";

export default (state = {}, action) => {
    switch (action.type) {
        case fulfilled(LOAD_FILE_ACTION): {
            const {moves} = action.payload;
            console.log(moves);
            return {moves, next: 0}; // no moves have been run so far
        }
        case SEQUENTIAL_MOVE_ACTION:
            const {next: nextOrPrevious} = action.payload,
                {moves, next} = state;
            const moveToExecute = nextOrPrevious ? moves[next] : moves[next - 2],
                newState = {
                    moves: state.moves,
                    next: nextOrPrevious ? next + 1 : next - 1 // mfw
                };
            console.log(state);
            console.log(newState);
            return loop(newState, Cmd.action(runMove(nextOrPrevious, moveToExecute)));
        default:
            return state
    }
}