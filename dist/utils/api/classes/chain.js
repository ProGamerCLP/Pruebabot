"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Chain {
    constructor() {
        this.map = new Map();
    }
    update(id, n) {
        const v = this.map.get(id) || 0;
        if (n)
            this.map.set(id, v + n);
        return v + 1;
    }
    push(id, time) {
        const n = this.update(id, 1);
        setTimeout(() => this.update(id, -1), time);
        return n;
    }
    get(id) {
        return this.update(id);
    }
}
exports.default = Chain;
//# sourceMappingURL=chain.js.map