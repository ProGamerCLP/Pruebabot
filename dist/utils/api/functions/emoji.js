"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emoji = void 0;
// returns 0 if is not an emoji, returns 1 if is a normal emoji, and 2 if is a custom emoji
function is(str) {
    const emojiReg = /[\uD83C\uDF00-\uD83D\uDFFF]|[\uD83E\uDD00-\uD83E\uDDFF]/gu;
    const customReg = /<:[a-zA-Z0-9_]+:\d+>/gu;
    return emojiReg.test(str) ? 1 : customReg.test(str) ? 2 : 0;
}
// parses a custom emoji data to a string <name:id>
const stringify = (data) => `${data.name}:${data.id}`;
exports.emoji = { is, stringify };
//# sourceMappingURL=emoji.js.map