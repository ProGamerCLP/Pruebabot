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
const chain = new codecord_1.Chain();
const interval = 15;
const max = 5;
function main(guild, { executorId, executor, target, actionType }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!executorId || !executor)
            return;
        const userChain = chain.push(executorId, interval);
        if (userChain < max)
            return;
        if (actionType !== "Delete" && actionType !== "Create")
            return;
        yield (0, warn_1.warn)(guild, `channel${actionType}`, executor, {
            chain: userChain,
            interval: interval,
            channel: target,
        });
    });
}
exports.default = main;
//# sourceMappingURL=guildChannelsShield.js.map