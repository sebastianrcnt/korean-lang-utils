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
