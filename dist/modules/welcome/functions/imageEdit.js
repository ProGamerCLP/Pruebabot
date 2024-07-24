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
const codecord_1 = require("../../../utils/api/codecord");
const module_1 = require("../module");
const msg = {
    noValidNumber: "Proporciona un número válido.",
    outOfLimits: "Proporciona un número dentro de los límites posibles.",
    notImage: "Proporciona una url de imagen válida.",
    notSnowflake: "Proporciona una id válida",
};
const r = (i, code) => __awaiter(void 0, void 0, void 0, function* () {
    if (!i.replied) {
        yield i.reply({
            content: msg[code],
            ephemeral: true,
        });
    }
    else {
        yield i.editReply({
            content: msg[code],
        });
    }
});
exports.default = {
    avatar_cords: (i, input) => __awaiter(void 0, void 0, void 0, function* () {
        const x = Number(input.avatar_x);
        const y = Number(input.avatar_y);
        if (isNaN(x) || isNaN(y))
            return yield r(i, "noValidNumber");
        if (x > 1000 || y > 1000)
            return yield r(i, "outOfLimits");
        module_1.welcomeModule.config.set("avatar_x", x);
        module_1.welcomeModule.config.set("avatar_y", y);
    }),
    text_cords: (i, input) => __awaiter(void 0, void 0, void 0, function* () {
        const x = Number(input.text_x);
        const y = Number(input.text_y);
        if (isNaN(x) || isNaN(y))
            return yield r(i, "noValidNumber");
        if (x > 1000 || y > 1000)
            return yield r(i, "outOfLimits");
        module_1.welcomeModule.config.set("text_x", x);
        module_1.welcomeModule.config.set("text_y", y);
    }),
    avatar_size: (i, input) => __awaiter(void 0, void 0, void 0, function* () {
        const size = Number(input.avatar_size);
        if (isNaN(size))
            return r(i, "noValidNumber");
        module_1.welcomeModule.config.set("avatar_size", size);
    }),
    background: (i, input) => __awaiter(void 0, void 0, void 0, function* () {
        const { guild } = i;
        if (!guild)
            return;
        const data = yield module_1.welcomeModule.data.get(guild.id);
        const link = input.background, valid = yield codecord_1.url.imageTest(link);
        if (!valid)
            return yield r(i, "notImage");
        const newData = Object.assign(Object.assign({}, data), { avatarURL: link });
        yield module_1.welcomeModule.data.set(guild.id, Object.assign(Object.assign({}, data), { imageURL: link }));
    }),
    text: (i, input) => {
        module_1.welcomeModule.config.set("text", input.text);
    },
    message_public: (i, input) => __awaiter(void 0, void 0, void 0, function* () {
        const { channel, guild } = i;
        if (!channel ||
            !guild ||
            !(channel.messages instanceof discord_js_1.GuildMessageManager))
            return yield r(i, "notSnowflake");
        const message = yield codecord_1.snowflake.fetch(channel.messages, input.messageId);
        if (!message || !(message instanceof discord_js_1.Message))
            return yield r(i, "notSnowflake");
        const data = yield module_1.welcomeModule.data.get(guild.id), { content, embeds } = message;
        yield module_1.welcomeModule.data.set(guild.id, Object.assign(Object.assign({}, data), { message_public: {
                content,
                embeds,
            } }));
    }),
    message_private: (i, input) => __awaiter(void 0, void 0, void 0, function* () {
        const { channel, guild } = i;
        if (!channel ||
            !guild ||
            !(channel.messages instanceof discord_js_1.GuildMessageManager))
            return;
        const message = yield codecord_1.snowflake.fetch(channel.messages, input.messageId);
        if (!message || !(message instanceof discord_js_1.Message))
            return yield r(i, "notSnowflake");
        const data = yield module_1.welcomeModule.data.get(guild.id), { content, embeds } = message;
        yield module_1.welcomeModule.data.set(guild.id, Object.assign(Object.assign({}, data), { message_private: {
                content,
                embeds,
            } }));
    }),
    channelId: (i, input) => __awaiter(void 0, void 0, void 0, function* () {
        if (!i.guild)
            return;
        const channel = yield codecord_1.snowflake.fetch(i.guild.channels, input.channelId);
        if (!channel || !(channel instanceof discord_js_1.GuildChannel))
            return yield r(i, "notSnowflake");
        const data = yield module_1.welcomeModule.data.get(i.guild.id);
        module_1.welcomeModule.data.set(i.guild.id, Object.assign(Object.assign({}, data), { channelId: channel.id }));
    }),
};
//# sourceMappingURL=imageEdit.js.map