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
