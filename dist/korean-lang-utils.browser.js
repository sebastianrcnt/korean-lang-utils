(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    
    },{"../utils":8}],2:[function(require,module,exports){
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const errors_1 = require("../errors");
    const utils_1 = require("../utils");
    const disassembleLetter = (letterString) => {
        if (!(0, utils_1.isLetter)(letterString))
            throw new errors_1.InvalidLetterLengthException();
        if (!(0, utils_1.isHangul)(letterString))
            throw new errors_1.NotHangulLetterException();
        if (!(0, utils_1.isCompleteLetter)(letterString))
            throw new errors_1.AlreadyDisassembledLetterException();
        const charCode = (0, utils_1.getCharCode)(letterString);
        const topIndex = Math.floor((charCode - 44032) / 21 / 28);
        const midIndex = Math.floor((charCode - 44032 - topIndex * 21 * 28) / 28);
        const bottomIndex = Math.floor(charCode - 44032 - topIndex * 21 * 28 - midIndex * 28);
        return {
            top: (0, utils_1.getTopAtomByIndex)(topIndex),
            mid: (0, utils_1.getMidAtomByIndex)(midIndex),
            bottom: (0, utils_1.getBottomAtomByIndex)(bottomIndex),
        };
    };
    exports.default = disassembleLetter;
    
    },{"../errors":5,"../utils":8}],3:[function(require,module,exports){
    "use strict";
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    const errors_1 = require("../errors");
    const assembleLetter_1 = __importDefault(require("./assembleLetter"));
    const disassembleLetter_1 = __importDefault(require("./disassembleLetter"));
    const typewrite = (sentence) => {
        let prev = "";
        let history = [];
        for (let i = 0; i < sentence.length; i++) {
            const letterString = sentence[i];
            let stack = [];
            try {
                const letterObject = (0, disassembleLetter_1.default)(letterString);
                stack.push(letterObject.top);
                stack.push((0, assembleLetter_1.default)({
                    top: letterObject.top,
                    mid: letterObject.mid,
                    bottom: "",
                }));
                if (letterObject.bottom !== "")
                    stack.push(letterString);
            }
            catch (error) {
                if (error instanceof errors_1.NotHangulLetterException)
                    stack.push(letterString);
                else if (error instanceof errors_1.AlreadyDisassembledLetterException)
                    stack.push(letterString);
                else
                    throw error;
            }
            stack.forEach((s) => {
                history.push(prev + s);
            });
            prev = history[history.length - 1];
        }
        return history;
    };
    exports.default = typewrite;
    
    },{"../errors":5,"./assembleLetter":1,"./disassembleLetter":2}],4:[function(require,module,exports){
    "use strict";
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
    
    },{}],5:[function(require,module,exports){
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlreadyDisassembledLetterException = exports.NotHangulLetterException = exports.InvalidLetterLengthException = void 0;
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
    exports.InvalidLetterLengthException = InvalidLetterLengthException;
    let NotHangulLetterException = class NotHangulLetterException extends Error {
    };
    NotHangulLetterException = __decorate([
        injectCustomErrorMessage("한글 글자가 아닙니다")
    ], NotHangulLetterException);
    exports.NotHangulLetterException = NotHangulLetterException;
    let AlreadyDisassembledLetterException = class AlreadyDisassembledLetterException extends Error {
    };
    AlreadyDisassembledLetterException = __decorate([
        injectCustomErrorMessage("더 이상 분해할 수 없는 기본 음운입니다")
    ], AlreadyDisassembledLetterException);
    exports.AlreadyDisassembledLetterException = AlreadyDisassembledLetterException;
    
    },{}],6:[function(require,module,exports){
    "use strict";
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    const typewrite_1 = __importDefault(require("./anatomy/typewrite"));
    globalThis.typewrite = typewrite_1.default;
    window.typewrite = typewrite_1.default;
    
    },{"./anatomy/typewrite":3}],7:[function(require,module,exports){
    (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    "use strict";
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
    
    },{}],2:[function(require,module,exports){
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlreadyDisassembledLetterException = exports.NotHangulLetterException = exports.InvalidLetterLengthException = void 0;
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
    exports.InvalidLetterLengthException = InvalidLetterLengthException;
    let NotHangulLetterException = class NotHangulLetterException extends Error {
    };
    NotHangulLetterException = __decorate([
        injectCustomErrorMessage("한글 글자가 아닙니다")
    ], NotHangulLetterException);
    exports.NotHangulLetterException = NotHangulLetterException;
    let AlreadyDisassembledLetterException = class AlreadyDisassembledLetterException extends Error {
    };
    AlreadyDisassembledLetterException = __decorate([
        injectCustomErrorMessage("더 이상 분해할 수 없는 기본 음운입니다")
    ], AlreadyDisassembledLetterException);
    exports.AlreadyDisassembledLetterException = AlreadyDisassembledLetterException;
    
    },{}],3:[function(require,module,exports){
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.typewrite = void 0;
    globalThis.typewrite = typewrite;
    
    },{}],4:[function(require,module,exports){
    (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    "use strict";
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
    
    },{}],2:[function(require,module,exports){
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlreadyDisassembledLetterException = exports.NotHangulLetterException = exports.InvalidLetterLengthException = void 0;
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
    exports.InvalidLetterLengthException = InvalidLetterLengthException;
    let NotHangulLetterException = class NotHangulLetterException extends Error {
    };
    NotHangulLetterException = __decorate([
        injectCustomErrorMessage("한글 글자가 아닙니다")
    ], NotHangulLetterException);
    exports.NotHangulLetterException = NotHangulLetterException;
    let AlreadyDisassembledLetterException = class AlreadyDisassembledLetterException extends Error {
    };
    AlreadyDisassembledLetterException = __decorate([
        injectCustomErrorMessage("더 이상 분해할 수 없는 기본 음운입니다")
    ], AlreadyDisassembledLetterException);
    exports.AlreadyDisassembledLetterException = AlreadyDisassembledLetterException;
    
    },{}],3:[function(require,module,exports){
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.typewrite = void 0;
    globalThis.typewrite = typewrite;
    if (window) {
        window.typewrite = typewrite;
    }
    
    },{}],4:[function(require,module,exports){
    (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    "use strict";
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
    
    },{}],2:[function(require,module,exports){
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlreadyDisassembledLetterException = exports.NotHangulLetterException = exports.InvalidLetterLengthException = void 0;
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
    exports.InvalidLetterLengthException = InvalidLetterLengthException;
    let NotHangulLetterException = class NotHangulLetterException extends Error {
    };
    NotHangulLetterException = __decorate([
        injectCustomErrorMessage("한글 글자가 아닙니다")
    ], NotHangulLetterException);
    exports.NotHangulLetterException = NotHangulLetterException;
    let AlreadyDisassembledLetterException = class AlreadyDisassembledLetterException extends Error {
    };
    AlreadyDisassembledLetterException = __decorate([
        injectCustomErrorMessage("더 이상 분해할 수 없는 기본 음운입니다")
    ], AlreadyDisassembledLetterException);
    exports.AlreadyDisassembledLetterException = AlreadyDisassembledLetterException;
    
    },{}],3:[function(require,module,exports){
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.typewrite = void 0;
    globalThis.typewrite = typewrite;
    
    },{}],4:[function(require,module,exports){
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
    
    },{"./constants":1}]},{},[1,2,3,4]);
    
    },{"./constants":1}],5:[function(require,module,exports){
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
    
    },{"./constants":1}]},{},[1,2,3,4,5]);
    
    },{"./constants":1}],5:[function(require,module,exports){
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
    
    },{"./constants":1}]},{},[1,2,3,4,5]);
    
    },{"./constants":4}],8:[function(require,module,exports){
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
    
    },{"./constants":4}]},{},[4,5,6,7,8]);
    