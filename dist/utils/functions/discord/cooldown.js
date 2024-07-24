"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cooldown = void 0;
const map = new Map();
function is(id) {
    const userTimeouts = map.get(id) || 0;
    if (userTimeouts > 4)
        return true;
    else
        return false;
}
function add(id) {
    const userTimeouts = map.get(id) || 0;
    map.set(id, userTimeouts + 1);
    setTimeout(() => {
        const userTimeouts = map.get(id) || 0;
        if (!userTimeouts)
            map.delete(id);
        else
            map.set(id, userTimeouts - 1);
    });
}
exports.cooldown = { is, add, map };
//# sourceMappingURL=cooldown.js.map