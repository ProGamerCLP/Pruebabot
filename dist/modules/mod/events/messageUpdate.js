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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = __importDefault(require("../functions/exports"));
const warn_1 = require("../utils/warn");
const types_1 = require("../types");
exports.default = (m) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Message edited.");
    if (!m.guild)
        return;
    if (!m.guild || m.reactions.message.author?.id === m.client.user.id)
        return;
    for (const [infraction, shieldFunction] of Object.entries(exports_1.default.message)) {
        const ctx = yield shieldFunction(m);
        if (!(0, types_1.isInfraction)(infraction))
            continue;
        if (ctx) {
            const x = yield (0, warn_1.warn)(m.guild, infraction, m.author, ctx);
            if(x !== 400) yield m.delete().catch(console.error);
            return;
        }
    }
});
//# sourceMappingURL=messageUpdate.js.map