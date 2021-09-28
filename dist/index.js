"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typewrite_1 = __importDefault(require("./anatomy/typewrite"));
globalThis.typewrite = typewrite_1.default;
window.typewrite = typewrite_1.default;
