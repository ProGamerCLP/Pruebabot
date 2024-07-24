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
exports.warn = void 0;
const discord_js_1 = require("discord.js");
const branding_1 = require("../../../utils/api/functions/branding");
const types_1 = require("../types");
const module_1 = require("../module");
const codecord_1 = require("../../../utils/api/codecord");
const messages_1 = __importDefault(require("./messages"));
const reasons_1 = __importDefault(require("./reasons"));
const c = (str) => "```" + str + "```";
/**
 * Creates a report and sends it to the designed channel
 * @param infractionType
 * @param ctx
 */
function warn(guild, infraction, user, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user.id === user.client.user.id)
            return console.log("[moderation] Cannot warn my self");
        const branding = yield (0, branding_1.getBranding)(guild);
        let whitelist = yield module_1.mod.data.get(infraction);
        if ((whitelist && whitelist.includes(user.id)) || !(0, types_1.isInfraction)(infraction))
            return 400;
        const r = reasons_1.default[infraction](ctx);
        const embed = new discord_js_1.EmbedBuilder()
            .setAuthor({
            iconURL: branding === null || branding === void 0 ? void 0 : branding.icon,
            name: guild.name + " moderation",
        })
            .setTitle(`${user.username} ha sido penalizado`)
            .setDescription(r.description)
            .setFields([
            Object.assign({}, r.provided),
            { name: "Hora", value: `${new Date().toDateString()}` },
        ])
            .setFooter({ text: `User id: ${user.id}` })
            .setColor((branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xffffff);
        const channelId = module_1.mod.config.get("moderationChannel"), channel = yield codecord_1.snowflake.fetch(guild.client.channels, channelId);
        if (!channel || !(channel instanceof discord_js_1.TextChannel))
            return;
        yield channel
            .send({
            embeds: [embed],
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                    .setCustomId(`revoke`)
                    .setLabel("Retirar timeout")
                    .setStyle(2), new discord_js_1.ButtonBuilder().setCustomId(`ban`).setLabel("Banear").setStyle(1)),
            ],
        })
            .catch(console.error);
        const guildMember = yield codecord_1.snowflake.fetch(guild.members, user.id);
        if (!guildMember || !(guildMember instanceof discord_js_1.GuildMember))
            return;
        yield guildMember
            .timeout(24 * 60 * 60 * 1000)
            .catch((e) => console.log(messages_1.default.missingPermissionsTimeout)); // un día de timeout
        yield guildMember
            .send({
            embeds: [
                {
                    author: {
                        icon_url: branding === null || branding === void 0 ? void 0 : branding.icon,
                        name: guild.name + " moderation",
                    },
                    title: r.description,
                    description: messages_1.default.onWarnedDm,
                    fields: [Object.assign({}, r.provided)],
                    color: (branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xffffff,
                },
            ],
        })
            .catch();
        console.log(`> ${user.username} has been warned.`);
    });
}
exports.warn = warn;
//# sourceMappingURL=warn.js.map