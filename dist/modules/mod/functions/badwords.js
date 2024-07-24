"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../module");
function main({ content: str }) {
    // parsing the badword list
    const badwords = module_1.mod.config
        .get("badwordList")
        .replace(/ /g, "")
        .split(",");
    if (!str)
        return;
    // for each banned word of the list
    for (const badword of badwords) {
        // if the badword is included in the content of the msg
        if (str.toLowerCase().includes(badword)) {
            // index of badword`
            const iob = str.indexOf(badword);
            // check if it isn't a word included inside another one => "computadora"
            if (iob - 1 !== -1 && str[iob + badword.length + 1] !== " " && str[iob - 1] !== " ")
                continue;
            return badword;
        }
    }
    return false;
}
exports.default = main;
//# sourceMappingURL=badwords.js.map