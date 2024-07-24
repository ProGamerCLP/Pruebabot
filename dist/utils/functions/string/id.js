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
exports.id = void 0;
const symbolReg = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
function createUnique(datakeys, newkey) {
    return __awaiter(this, void 0, void 0, function* () {
        let str = "";
        for (const char of newkey) {
            if (symbolReg.test(char))
                continue;
            if (char == "")
                continue;
            str += char;
        }
        let i = 0;
        let un = str;
        console.log(datakeys);
        while (str in datakeys) {
            i++;
            un = str + i;
        }
        console.log(un);
        return un;
    });
}
exports.id = { createUnique };
//# sourceMappingURL=id.js.map