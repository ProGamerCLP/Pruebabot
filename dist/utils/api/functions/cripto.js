"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.password = void 0;
const bcrypt = require("bcryptjs");
// hashes a string
function hash(str) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const saltRounds = 10;
            const hashedPassword = yield bcrypt.hash(str, saltRounds);
            return hashedPassword;
        }
        catch (error) {
            console.error("Error:", error);
            return null;
        }
    });
}
// dehashed a string
function verify(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const match = yield bcrypt.compare(password, hashedPassword);
            return match;
        }
        catch (error) {
            console.error("Error:", error);
            return false;
        }
    });
}
exports.password = { hash, verify };
//# sourceMappingURL=cripto.js.map