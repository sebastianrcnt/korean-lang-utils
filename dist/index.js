"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOTTOM_ATOMS = exports.MID_ATOMS = exports.TOP_ATOMS = void 0;
exports.TOP_ATOMS = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
];
exports.MID_ATOMS = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
];
exports.BOTTOM_ATOMS = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
];
const reverseMapify = (source) => {
    const result = new Map();
    for (let index = 0; index < source.length; index++) {
        result.set(source[index], index);
    }
    return result;
};
const topAtomsIndexMap = reverseMapify(exports.TOP_ATOMS);
const midAtomsIndexMap = reverseMapify(exports.MID_ATOMS);
const bottomAtomsIndexMap = reverseMapify(exports.BOTTOM_ATOMS);
const isLetter = (letter) => {
    return letter.length <= 1;
};
const getCharCode = (letter) => {
    if (!isLetter(letter)) {
        throw new Error("Letters should be 1 length long");
    }
    return letter.charCodeAt(0);
};
const getTopAtomByIndex = (index) => exports.TOP_ATOMS[index];
const getMidAtomByIndex = (index) => exports.MID_ATOMS[index];
const getBottomAtomByIndex = (index) => exports.BOTTOM_ATOMS[index];
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
const injectCustomErrorMessage = (errorMessage) => {
    return function classDecorator(constructor) {
        return class extends constructor {
            constructor(...args) {
                super(errorMessage);
            }
        };
    };
};
let InvalidLetterLengthException = class InvalidLetterLengthException extends Error {
};
InvalidLetterLengthException = __decorate([
    injectCustomErrorMessage("글자의 길이는 1 이하여야 합니다")
], InvalidLetterLengthException);
let NotHangulLetterException = class NotHangulLetterException extends Error {
};
NotHangulLetterException = __decorate([
    injectCustomErrorMessage("한글 글자가 아닙니다")
], NotHangulLetterException);
let AlreadyDisassembledLetterException = class AlreadyDisassembledLetterException extends Error {
};
AlreadyDisassembledLetterException = __decorate([
    injectCustomErrorMessage("더 이상 분해할 수 없는 기본 음운입니다")
], AlreadyDisassembledLetterException);
const disassembleLetter = (letterString) => {
    if (!isLetter(letterString)) {
        throw new InvalidLetterLengthException();
    }
    if (!isHangul(letterString)) {
        throw new NotHangulLetterException();
    }
    if (!isCompleteLetter(letterString)) {
        throw new AlreadyDisassembledLetterException();
    }
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
            if (error instanceof NotHangulLetterException) {
                stack.push(letterString);
            }
            else if (error instanceof AlreadyDisassembledLetterException) {
                stack.push(letterString);
            }
            else {
                throw error;
            }
        }
        console.log({ stack, letterString });
        stack.forEach((s) => {
            history.push(prev + s);
        });
        prev = history[history.length - 1];
    }
    return history;
};
exports.default = typewrite;
