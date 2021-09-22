"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseMapify = void 0;
const reverseMapify = (source) => {
    const result = new Map();
    for (let index = 0; index < source.length; index++) {
        result.set(source[index], index);
    }
    return result;
};
exports.reverseMapify = reverseMapify;
