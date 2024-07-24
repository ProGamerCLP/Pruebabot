"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codecord_1 = require("../../../utils/api/codecord");
const interval = 10;
// to save how many messages a user has sent in the last x seconds
const chain = new codecord_1.Chain();
function main(m) {
    var _a, _b;
    const userId = ((_a = m.author) === null || _a === void 0 ? void 0 : _a.id) || m.reactions.message.author?.id;
    // get the message chain of the author of a message
    chain.push(userId, interval * 1000);
    const userChain = chain.get(userId);
    console.log(`${(_b = m.author) === null || _b === void 0 ? void 0 : _b.username}: ${chain.get(userId)}`);
    if (userChain > 6)
        return {
            interval,
            chain: userChain,
            message: m.content,
        };
}
exports.default = main;
//# sourceMappingURL=flood.js.map