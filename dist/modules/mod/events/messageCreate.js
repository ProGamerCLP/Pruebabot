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
    if (!m.guild || m.author.id === m.client.user.id)
        return;
    for (const [infraction, shieldFunction] of Object.entries(exports_1.default.message)) {
        const ctx = yield shieldFunction(m);
        if (!(0, types_1.isInfraction)(infraction))
            continue;
        if (ctx) {
            const x = yield (0, warn_1.warn)(m.guild, infraction, m.author, ctx);
            console.log(x);
            if (x !== 400) yield m.delete().catch(console.error);
            return;
        }
    }
    /*const { guild, author } = m;
  
    // if the author of the message is the own bot, then there is no need to scan the m
    if (!guild || !author || author.id === m.client.user.id) return;
  
    const result = await secure.message(m);
  
    // if there is no results, then the scan didn‘t detect anything so its ok
    if (!result) return;
  
    // fetch the member and the log channel
    const member = await snowflake.fetch(guild.members, m.author.id),
      logChannel = await snowflake.fetch(guild.channels, "1230580493372620992");
    if (!member || !(member instanceof GuildMember)) return;
  
    // timeout the user 6 hours
    await member.timeout(6 * 60 * 60 * 1000);
  
    // send a warning message to the member
    await member.send({}).catch(console.error);
  
    if (
      !logChannel ||
      !(logChannel instanceof GuildChannel) ||
      logChannel.type !== ChannelType.GuildText
    )
      return;
  
    // send a log of the timeout that has ocurred.
    await logChannel.send({}).catch(console.error);*/
});
//# sourceMappingURL=messageCreate.js.map