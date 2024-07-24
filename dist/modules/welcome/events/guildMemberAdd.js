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
const discord_js_1 = require("discord.js");
const module_1 = require("../module");
const codecord_1 = require("../../../utils/api/codecord");
const generateImage_1 = require("../functions/generateImage");
const invites_1 = require("../functions/invites");
/**
 * Every time a new user joins the guild, the invite cache is updated and messages are sent to the dm & public welcome channel.
 * @param {GuildMember} member
 * @void
 */
exports.default = (member) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { guild } = member;
    // welcome channel id, public and private message
    const data = yield module_1.welcomeModule.data.get(guild.id);
    if (!data)
        return;
    // welcome channel of this guild
    const channel = yield codecord_1.snowflake.fetch(guild.channels, data.channelId);
    if (!channel ||
        !(channel instanceof discord_js_1.GuildChannel) ||
        channel.type !== discord_js_1.ChannelType.GuildText)
        return console.log("[welcome] Failed to create welcome because channel is not valid");
    const image = yield (0, generateImage_1.generateImage)(member), invite = yield invites_1.invites.getLastUsed(guild), attachment = new discord_js_1.AttachmentBuilder(image, { name: "generated-image.png" }), messagePublic = data.message_public, messagePrivate = data.message_private;
    if (messagePublic) {
        let content;
        let embeds;
        let files;
        content = messagePublic.content;
        if (messagePublic.embeds) {
            const embed = new discord_js_1.EmbedBuilder(messagePublic.embeds[0]).setImage("attachment://generated-image.png");
            // if the invite is found we add it to the first embed
            if (invite && invite.inviter)
                embed.setFooter({ text: `Invitado por ${invite.inviter.username}` });
            embeds = [embed];
        }
        files = [attachment];
        // sending the message
        yield channel.send({
            content : `<@${member.user.id}>` + (content || ``),
            embeds,
            files,
        });
    }
    // if the private message is configured, we send it to the user
    if (!messagePrivate)
        return;
    let files;
    // if there are embeds, we add the welcome image to the first one
    const embeds = messagePrivate.embeds
        ? messagePrivate.embeds.map((e, i) => {
            const builder = new discord_js_1.EmbedBuilder(e);
            if (!i) {
                builder.setImage("attachment://generated-image.png");
                files = [attachment];
            }
            return builder;
        })
        : undefined;
    // send private message
    yield member
        .send({
        content: (_a = messagePrivate.content) === null || _a === void 0 ? void 0 : _a.replace("[user]", member.user.username),
        embeds,
        files,
    })
        .catch((e) => {
        if (e instanceof Error)
            console.log(`No se ha podido mandar mensaje privado al usuario ${member.user.username}\n> Mensaje de error: ${e.message}`);
    });
});
//# sourceMappingURL=guildMemberAdd.js.map