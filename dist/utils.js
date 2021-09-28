"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeLetterObject = exports.isCompleteLetter = exports.isLetter = exports.isHangul = exports.getIndexOfBottomAtom = exports.getIndexOfMidAtom = exports.getIndexOfTopAtom = exports.getBottomAtomByIndex = exports.getMidAtomByIndex = exports.getTopAtomByIndex = exports.getCharCode = void 0;
const constants_1 = require("./constants");
const reverseMapify = (source) => {
    const result = new Map();
    for (let index = 0; index < source.length; index++) {
        result.set(source[index], index);
    }
    return result;
};
const topAtomsIndexMap = reverseMapify(constants_1.TOP_ATOMS);
const midAtomsIndexMap = reverseMapify(constants_1.MID_ATOMS);
const bottomAtomsIndexMap = reverseMapify(constants_1.BOTTOM_ATOMS);
const getCharCode = (letter) => {
    if (!(0, exports.isLetter)(letter))
        throw new Error("Letters should be 1 length long");
    return letter.charCodeAt(0);
};
exports.getCharCode = getCharCode;
// index -> atom
// atom -> index
const getTopAtomByIndex = (index) => constants_1.TOP_ATOMS[index];
exports.getTopAtomByIndex = getTopAtomByIndex;
const getMidAtomByIndex = (index) => constants_1.MID_ATOMS[index];
exports.getMidAtomByIndex = getMidAtomByIndex;
const getBottomAtomByIndex = (index) => constants_1.BOTTOM_ATOMS[index];
exports.getBottomAtomByIndex = getBottomAtomByIndex;
const getIndexOfTopAtom = (topAtom) => topAtomsIndexMap.get(topAtom);
exports.getIndexOfTopAtom = getIndexOfTopAtom;
const getIndexOfMidAtom = (midAtom) => midAtomsIndexMap.get(midAtom);
exports.getIndexOfMidAtom = getIndexOfMidAtom;
const getIndexOfBottomAtom = (bottomAtom) => bottomAtomsIndexMap.get(bottomAtom);
exports.getIndexOfBottomAtom = getIndexOfBottomAtom;
// validators
const isHangul = (letterString) => {
    const code = (0, exports.getCharCode)(letterString);
    return code >= 44032 && code <= 55199;
};
exports.isHangul = isHangul;
const isLetter = (letter) => letter.length <= 1;
exports.isLetter = isLetter;
const isCompleteLetter = (letterString) => {
    const code = (0, exports.getCharCode)(letterString);
    return 0xac00 <= code && code <= 0xd7a3;
};
exports.isCompleteLetter = isCompleteLetter;
const serializeLetterObject = (letterObject) => letterObject.bottom === ""
    ? [letterObject.top, letterObject.mid]
    : [letterObject.top, letterObject.mid, letterObject.bottom];
exports.serializeLetterObject = serializeLetterObject;
