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
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("send")
        .setDescription("Enviar un mensaje pre-definido")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .addStringOption(o => o.setName("id").setDescription("Id del mensaje").setRequired(true))
        .addUserOption(o => o.setName("user").setDescription("Usuario en cuestión").setRequired(false)),
    execute(i) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const key = i.options.getString("id");
            const messages = require("../../../../assets/files/messages.json");
            if (!key)
                return;
            if (typeof messages !== "object")
                return;
            let content = messages[key];
            const user = i.options.getUser("user");
            if (user) {
                content = content.replace("[USER_MENTION]", `<@${user.id}>`);
            }
            if (!content)
                return;
            yield ((_a = i.channel) === null || _a === void 0 ? void 0 : _a.send(content));
            yield i.reply({
                content: "Mensaje enviado.",
                ephemeral: true
            });
        });
    }
};
//# sourceMappingURL=message.js.map