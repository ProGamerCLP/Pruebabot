"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const fs_1 = __importDefault(require("fs"));
function access(path) {
    try {
        fs_1.default.accessSync(path, fs_1.default.constants.F_OK);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.file = {
    access,
};
//# sourceMappingURL=files.js.map