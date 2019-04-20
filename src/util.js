export const pending = name => name + "_PENDING";
export const fulfilled = name => name + "_FULFILLED";
export const rejected = name => name + "_REJECTED";

// AAAAAAAAAAAAAAAAAAAAAAAAAAAA
export const arrayBufferToString = buf =>
    String.fromCharCode.apply(null, new Uint16Array(buf));