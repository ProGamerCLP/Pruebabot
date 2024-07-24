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
const codecord_1 = require("../../../utils/api/codecord");
const module_1 = require("../module");
const branding_1 = require("../../../utils/api/functions/branding");
const menu_1 = require("../components/menu");
const generateImage_1 = require("../functions/generateImage");
const input_1 = require("../components/input");
const imageEdit_1 = __importDefault(require("../functions/imageEdit"));
const guildMemberAdd_1 = __importDefault(require("../events/guildMemberAdd"));
const createGuildData = (guild) => __awaiter(void 0, void 0, void 0, function* () {
    const defaultURL = yield module_1.welcomeModule.config.get("defaultURL"), newData = { imageURL: defaultURL };
    yield module_1.welcomeModule.data.set(guild.id, newData);
    return newData;
});
exports.default = {
    // Slash command builder
    data: new discord_js_1.SlashCommandBuilder()
        .setName("welcome")
        .setDescription("👋 - Manager de bienvenidas")
        // subcomando image
        .addSubcommand((subcommand) => subcommand
        .setName("manager")
        .setDescription("👋 - Abrir configuración de bienvenidas"))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    /**
     * /farewell execution
     * @param {ChatInputCommandInteraction }interaction
     */
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { guild } = interaction;
            if (!guild)
                return;
            const member = yield codecord_1.snowflake.fetch(guild.members, interaction.user.id);
            if (!member || !(member instanceof discord_js_1.GuildMember))
                return;
            yield interaction.reply({
                embeds: [{ description: "Cargando..." }],
                ephemeral: true,
            });
            const guildId = guild.id;
            const book = new codecord_1.Book({
                render: () => __awaiter(this, void 0, void 0, function* () {
                    let data = yield module_1.welcomeModule.data.get(guildId);
                    const config = module_1.welcomeModule.config.get();
                    const branding = yield (0, branding_1.getBranding)(guild);
                    if (!data)
                        data = yield createGuildData(guild);
                    const embed = new discord_js_1.EmbedBuilder()
                        .setAuthor({
                        iconURL: guild.iconURL({ extension: "png" }) || config.defaultAvatar,
                        name: `${guild.name}`,
                    })
                        .setTitle("🖼️ Imagen de bienvenida")
                        .setDescription(`📨 **Canal de bienvenida:** <#${data.channelId || "No establecido."}>
            🖌️ **Imagen de bienvenida:** ${data.imageURL ? `[URL](${data.imageURL})` : "Por defecto"}
            💬 **Mensaje:** ${data.message_public ? "Configurado" : "Sin configurar"}
            👁️‍🗨️ **Mensaje privado**: ${data.message_private ? "Configurado" : "Sin configurar"}`)
                        .setFields({
                        name: "Ajustes",
                        value: `**Radio del avatar:** ${config.avatar_size}px
            🗺️ **Cordenadas del avatar:** (${config.avatar_x}, ${config.avatar_y})
            🔡 **Fuente:** ${config.font} (contacto para cambiar)
            🗺️ **Cordenadas del texto:** (${config.text_x}, ${config.text_y})
            ✏️ **Texto:** ${config.text}
            `,
                    })
                        .setColor((branding === null || branding === void 0 ? void 0 : branding.color.pattern) || "Blurple")
                        .setThumbnail(guild.iconURL({ extension: "png" }) || config.defaultAvatar)
                        .setImage("attachment://generated-image.png");
                    const imageBuffer = yield (0, generateImage_1.generateImage)(member);
                    const attachment = new discord_js_1.AttachmentBuilder(imageBuffer, {
                        name: "generated-image.png",
                    });
                    return {
                        embeds: [embed],
                        components: [menu_1.welcomeImageCommandComponents],
                        files: [attachment],
                    };
                }),
                length: 1,
                interaction,
            });
            yield book.write();
            // RECOLECTAR INTERACCIONES PARA LA CONFIGURACIóN
            const collector = new codecord_1.Collector(interaction);
            const isOption = (x) => x;
            collector.listen({
                welcomeImageSelectMenu: (i) => __awaiter(this, void 0, void 0, function* () {
                    const opt = i.values[0];
                    if (opt === "test") {
                        if (!i.guild)
                            return;
                        const member = yield codecord_1.snowflake.fetch(i.guild.members, i.user.id);
                        if (!(member instanceof discord_js_1.GuildMember))
                            return;
                        yield (0, guildMemberAdd_1.default)(member);
                        yield i.deferUpdate({});
                        return;
                    }
                    if (!opt || !isOption(opt))
                        return;
                    const input = input_1.inputs[opt];
                    const submitted = yield collector.modalSubmission(i, {
                        inputs: input,
                    });
                    if (!submitted)
                        return;
                    const f = imageEdit_1.default[opt];
                    yield f(i, submitted.values);
                    if (!i.replied)
                        yield i.deferUpdate({});
                    if (!submitted.response.replied)
                        yield submitted.response.deferUpdate({});
                    yield book.write();
                }),
            });
        });
    },
};
//# sourceMappingURL=welcome.js.map