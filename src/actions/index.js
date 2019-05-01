import {arrayBufferToString} from "../util";

export const SEQUENTIAL_MOVE_ACTION = "SMOVE";
export const MOVE_ACTION = "MOVE";
export const LOAD_FILE_ACTION = "LOAD_FILE";

export function runSequentialMove(next = true) {
    return {
        type: SEQUENTIAL_MOVE_ACTION,
        payload: {next}
    };
}

export function runMove(forward, move) {
    return {
        type: MOVE_ACTION,
        payload: {forward, move}
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