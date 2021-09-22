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
