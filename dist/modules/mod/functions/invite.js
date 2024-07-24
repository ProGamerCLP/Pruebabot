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
/*function readWhitelist() {
const ini = new Ini("moderation");

const list = (str: string) => str.replace(/ /g, "").split(",");

const reg = /https?:\/\/\S+/g;

  const domains = ini.get("whiteslistedDomains") || "";
  const urls = ini.get("whitelistedUrls") || "";

  return {
    domains: list(domains),
    urls: list(urls),
  };
}*/
/*function scan(content: string) {
  const whitelist = readWhitelist();
  let urls = content.match(/https?:\/\/\S+/g);

  if (!urls) return false;

  for (const url of urls) {
    if (!connection.valid(url)) continue;

    if (whitelist.domains.some((domain) => url.includes(domain))) continue;
    if (whitelist.urls.some((u) => url === u)) continue;

    return true;
  }

  return false;
}*/
const inviteReg = /discord\.gg\/\w+/;
function main({ guild, content: str }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!guild)
            return;
        let urls = str === null || str === void 0 ? void 0 : str.match(inviteReg);
        // if there aren't urls on the string then we return
        if (!urls)
            return;
        // for every url
        for (const url of urls) {
            // test if the url is real and is if it is a valid discord invite
            const test = yield codecord_1.url.test(url);
            if (!test && !inviteReg.test(url))
                continue;
            // see if the invite is from this guild
            if (guild.invites.cache.has(url.split(".gg/")[1]))
                continue;
            return url;
        }
        return false;
    });
}
exports.default = main;
//# sourceMappingURL=invite.js.map