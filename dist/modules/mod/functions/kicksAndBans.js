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
const codecord_1 = require("../../../utils/api/codecord");
const warn_1 = require("../utils/warn");
const interval = 10;
const max = 5;
const chain = new codecord_1.Chain();
exports.default = (executor, target, guild, type) => __awaiter(void 0, void 0, void 0, function* () {
    const userChain = chain.push(executor.id, interval * 1000);
    if (userChain < max)
        return;
    yield (0, warn_1.warn)(guild, !type ? "massBan" : "massKick", executor, {
        chain: userChain,
        interval,
        target,
    });
});
//# sourceMappingURL=kicksAndBans.js.map