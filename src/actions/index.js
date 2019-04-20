export const MOVE_ACTION = "MOVE";
export const LOAD_FILE_ACTION = "LOAD_FILE";

export function move(direction) {
    return {
        type: MOVE_ACTION,
        payload: direction
    };
}

export function loadFile(file) {
    const reader = new FileReader();

    const fileReadHandle = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject();
        reader.readAsBinaryString(file);
    });

    return {
        type: LOAD_FILE_ACTION,
        payload: fileReadHandle
    }
}