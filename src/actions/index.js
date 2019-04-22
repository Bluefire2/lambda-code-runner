import {arrayBufferToString} from "../util";

export const MOVE_ACTION = "MOVE";
export const LOAD_FILE_ACTION = "LOAD_FILE";

export function runMove(direction, move) {
    return {
        type: MOVE_ACTION,
        payload: {direction, move}
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