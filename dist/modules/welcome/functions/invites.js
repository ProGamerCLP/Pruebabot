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
exports.invites = void 0;
const cache = new Map();
function updateCache(client) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const guild of client.guilds.cache.values()) {
            cache.set(guild.id, guild.invites.cache);
        }
    });
}
function getLastUsed(guild) {
    return __awaiter(this, void 0, void 0, function* () {
        const guildCache = cache.get(guild.id);
        if (!guildCache)
            return updateCache(guild.client);
        let usedInvite;
        for (const invite of guild.invites.cache.values()) {
            const cachedInvite = guildCache.get(invite.code);
            if (cachedInvite && invite.uses !== cachedInvite.uses) {
                usedInvite = invite;
                break;
            }
        }
        yield updateCache(guild.client);
        return usedInvite;
    });
}
exports.invites = { getLastUsed, updateCache };
//# sourceMappingURL=invites.js.map