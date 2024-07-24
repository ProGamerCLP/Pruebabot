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
const guildChannelsShield_1 = __importDefault(require("../functions/guildChannelsShield"));
exports.default = ({ guild }) => __awaiter(void 0, void 0, void 0, function* () {
    const log = yield logs_1.logs.last(guild, {
        type: discord_js_1.AuditLogEvent.ChannelCreate,
    });
    if (!log)
        return console.log("[moderation] Channel deletion log not found.");
    yield (0, guildChannelsShield_1.default)(guild, log);
});
//# sourceMappingURL=channelCreate.js.map