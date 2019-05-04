import produce from 'immer';

import {fulfilled} from "../util";
import {Action} from "../actions";

const initialState = {
    initialized: false,
    play: false,
    playDelay: 300 // TODO: create an action that modifies this and hook it up to the UI
};

export default (state = initialState, action) => {
    switch (action.type) {
        case fulfilled(Action.LOAD_FILE_ACTION):
            return produce(state, draft => {
                draft.initialized = true;
            });
        case Action.SEQUENTIAL_MOVE_CYCLE:
            return produce(state, draft => {
                draft.play = true;
            });
        case Action.SEQUENTIAL_MOVE_CYCLE_STOP:
            return produce(state, draft => {
                draft.play = false;
            });
        default:
            return state;
    }
};