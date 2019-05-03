import {arrayBufferToString} from "../util";
import {actionChannel, call, put, race, take} from "redux-saga/effects";

export const SEQUENTIAL_MOVE_ACTION = "SMOVE";
export const SEQUENTIAL_MOVE_CYCLE = "SMOVE_CYCLE";
export const SEQUENTIAL_MOVE_CYCLE_STOP = "SMOVE_CYCLE_STOP";
export const MOVE_ACTION = "MOVE";
export const LOAD_FILE_ACTION = "LOAD_FILE";

const wait = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
};

export function* animateSaga() {
    const channel = yield actionChannel(SEQUENTIAL_MOVE_CYCLE);
    while (yield take(channel)) {
        while (true) {
            const {stopped} = yield race({
                wait: call(wait, 500),
                stopped: take(SEQUENTIAL_MOVE_CYCLE_STOP)
            });

            if (!stopped) {
                yield put(runSequentialMove());
            } else {
                break;
            }
        }
    }
}

export function runSequentialMove(next = true) {
    return {
        type: SEQUENTIAL_MOVE_ACTION,
        payload: {next}
    };
}

export function loadFile(file) {
    const fileReadHandle = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const text = reader.result instanceof ArrayBuffer ? arrayBufferToString(reader.result) : reader.result;
            resolve(JSON.parse(text));
        };
        reader.onerror = () => reject();
        reader.readAsBinaryString(file);
    });

    return {
        type: LOAD_FILE_ACTION,
        payload: fileReadHandle
    }
}