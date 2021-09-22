"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typewrite = void 0;
const constants_1 = require("./constants");
const errors_1 = require("./errors");
const utils_1 = require("./utils");
const topAtomsIndexMap = (0, utils_1.reverseMapify)(constants_1.TOP_ATOMS);
const midAtomsIndexMap = (0, utils_1.reverseMapify)(constants_1.MID_ATOMS);
const bottomAtomsIndexMap = (0, utils_1.reverseMapify)(constants_1.BOTTOM_ATOMS);
const isLetter = (letter) => {
    return letter.length <= 1;
};
const getCharCode = (letter) => {
    if (!isLetter(letter)) {
        throw new Error("Letters should be 1 length long");
    }
    return letter.charCodeAt(0);
};
const getTopAtomByIndex = (index) => constants_1.TOP_ATOMS[index];
const getMidAtomByIndex = (index) => constants_1.MID_ATOMS[index];
const getBottomAtomByIndex = (index) => constants_1.BOTTOM_ATOMS[index];
const getIndexOfTopAtom = (topAtom) => topAtomsIndexMap.get(topAtom);
const getIndexOfMidAtom = (midAtom) => midAtomsIndexMap.get(midAtom);
const getIndexOfBottomAtom = (bottomAtom) => bottomAtomsIndexMap.get(bottomAtom);
const assembleLetter = (letterObject) => {
    const { top, mid, bottom } = letterObject;
    let topIndex = getIndexOfTopAtom(top);
    let midIndex = getIndexOfMidAtom(mid);
    let bottomIndex = getIndexOfBottomAtom(bottom);
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
const isHangul = (letterString) => {
    const code = getCharCode(letterString);
    return code >= 44032 && code <= 55199;
};
const isCompleteLetter = (letterString) => {
    const code = getCharCode(letterString);
    return 0xac00 <= code && code <= 0xd7a3;
};
const disassembleLetter = (letterString) => {
    if (!isLetter(letterString))
        throw new errors_1.InvalidLetterLengthException();
    if (!isHangul(letterString))
        throw new errors_1.NotHangulLetterException();
    if (!isCompleteLetter(letterString))
        throw new errors_1.AlreadyDisassembledLetterException();
    const charCode = getCharCode(letterString);
    const topIndex = Math.floor((charCode - 44032) / 21 / 28);
    const midIndex = Math.floor((charCode - 44032 - topIndex * 21 * 28) / 28);
    const bottomIndex = Math.floor(charCode - 44032 - topIndex * 21 * 28 - midIndex * 28);
    return {
        top: getTopAtomByIndex(topIndex),
        mid: getMidAtomByIndex(midIndex),
        bottom: getBottomAtomByIndex(bottomIndex),
    };
};
const serializeLetterObject = (letterObject) => letterObject.bottom === ""
    ? [letterObject.top, letterObject.mid]
    : [letterObject.top, letterObject.mid, letterObject.bottom];
const typewrite = (sentence) => {
    let prev = "";
    let history = [];
    for (let i = 0; i < sentence.length; i++) {
        const letterString = sentence[i];
        let stack = [];
        try {
            const letterObject = disassembleLetter(letterString);
            stack.push(letterObject.top);
            stack.push(assembleLetter({
                top: letterObject.top,
                mid: letterObject.mid,
                bottom: "",
            }));
            if (letterObject.bottom !== "") {
                stack.push(letterString);
            }
        }
        catch (error) {
            if (error instanceof errors_1.NotHangulLetterException) {
                stack.push(letterString);
            }
            else if (error instanceof errors_1.AlreadyDisassembledLetterException) {
                stack.push(letterString);
            }
            else {
                throw error;
            }
        }
        stack.forEach((s) => {
            history.push(prev + s);
        });
        prev = history[history.length - 1];
    }
    return history;
};
exports.typewrite = typewrite;
globalThis.typewrite = typewrite;
