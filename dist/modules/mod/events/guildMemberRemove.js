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
const discord_js_1 = require("discord.js");
const logs_1 = require("../../../utils/api/functions/logs");
const kicksAndBans_1 = __importDefault(require("../functions/kicksAndBans"));
exports.default = (member) => __awaiter(void 0, void 0, void 0, function* () {
    const log = yield logs_1.logs.last(member.guild, {
        type: discord_js_1.AuditLogEvent.MemberKick,
    });
    console.log(log);
    if (!log ||
        !(log.target instanceof discord_js_1.User) ||
        //log.target.id !== member.user.id ||
        !log.executor)
        return;
    console.log("!!");
    yield (0, kicksAndBans_1.default)(log.executor, log.target, member.guild, 1);
});
//# sourceMappingURL=guildMemberRemove.js.map