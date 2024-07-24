"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    intents: 3276799,
    partials: [
        discord_js_1.Partials.Message,
        discord_js_1.Partials.GuildMember,
        discord_js_1.Partials.User,
        discord_js_1.Partials.Channel,
    ],
};
//# sourceMappingURL=config.js.map