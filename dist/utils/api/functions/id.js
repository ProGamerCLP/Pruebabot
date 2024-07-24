"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = void 0;
const symbolReg = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
function createUnique(datakeys, newkey) {
    let str = "";
    for (const char of newkey) {
        if (symbolReg.test(char))
            continue;
        if (char == "")
            continue;
        str += char;
    }
    let i = 0;
    let id = str;
    while (datakeys.includes(id)) {
        i++;
        id = str + i;
    }
    return id;
}
exports.id = { createUnique };
//# sourceMappingURL=id.js.map