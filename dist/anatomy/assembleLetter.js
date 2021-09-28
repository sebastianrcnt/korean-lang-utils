"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const assembleLetter = (letterObject) => {
    const { top, mid, bottom } = letterObject;
    let topIndex = (0, utils_1.getIndexOfTopAtom)(top);
    let midIndex = (0, utils_1.getIndexOfMidAtom)(mid);
    let bottomIndex = (0, utils_1.getIndexOfBottomAtom)(bottom);
    if (topIndex === undefined) {
        throw new Error(`${top}은 유효한 초성이 아닙니다`);
    }
    if (midIndex === undefined) {
        throw new Error(`${top}은 유효한 중성이 아닙니다`);
    }
    if (bottomIndex === undefined) {
        throw new Error(`${top}은 유효한 종성이 아닙니다`);
    }
    let assembledLetterCharCode = topIndex * 21 * 28 + midIndex * 28 + bottomIndex + 44032;
    return String.fromCharCode(assembledLetterCharCode);
};
exports.default = assembleLetter;
