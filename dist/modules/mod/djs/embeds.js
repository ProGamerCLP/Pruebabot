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
exports.warnEmbed = exports.ModerationInterface = void 0;
const discord_js_1 = require("discord.js");
const module_1 = require("../module");
const branding_1 = require("../../../utils/api/functions/branding");
class ModerationInterface {
    constructor(cmd) {
        const config = module_1.mod.config.get();
        this.cmd = cmd;
        this.config = config;
    }
    updateConfig() {
        this.config = module_1.mod.config.get();
    }
    pages() {
        let pages = ["main"]; // first page is always "main"
        if (this.config.spamShield)
            pages.push("spam");
        if (this.config.malwareShield)
            pages.push("malware");
        if (this.config.insideShield)
            pages.push("inside");
        if (this.config.backup)
            pages.push("backup");
        return pages;
    }
    render(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const pages = this.pages();
            const page = book.page;
            let ui;
            if (!pages[page])
                ui = "main";
            else
                ui = pages[page];
            switch (ui) {
                case "main":
                case "spam":
                case "malware":
                case "inside":
                case "backup":
                    return yield this[ui]();
                case "default":
                    return { embeds: [{ description: "Ha ocurrido un error." }] };
            }
        });
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cmd.guild)
                return {
                    content: "Ha ocurrido un error.",
                    components: [],
                };
            const branding = yield (0, branding_1.getBranding)(this.cmd.guild);
            const enabled = (v) => (v == true ? "Si" : "No");
            const embed = new discord_js_1.EmbedBuilder()
                .setAuthor({
                iconURL: branding === null || branding === void 0 ? void 0 : branding.icon,
                name: this.cmd.guild.name || "Moderation System",
            })
                .setTitle("🛡️ Moderation 🛡️").setDescription(`Eliminar Spam: ${enabled(this.config.spamShield)}
      Evitar flood: ${enabled(this.config.floodShield)}
      Filtrado de archivos: ${enabled(this.config.malwareShield)}
      Malas palabras: ${enabled(this.config.badwordShield)}
      Escudo interior: ${enabled(this.config.insideShield)}
      `);
            return { embeds: [embed] };
        });
    }
    spam() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cmd.guild)
                return {
                    content: "Ha ocurrido un error.",
                    components: [],
                };
            const { guild } = this.cmd;
            const branding = yield (0, branding_1.getBranding)(guild);
            const whitelist = this.config.urlWhitelist.split(",").join("\n");
            const embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ iconURL: branding === null || branding === void 0 ? void 0 : branding.icon, name: `${guild.name} moderation` })
                .setTitle("🛡️ Escudo anti-spam 🛡️")
                .setDescription("El módulo anti-spam se encarga de prevenir envíos de links externos dentro del servidor.")
                .setColor((branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xffffff)
                .setFields([
                {
                    name: "Whitelist",
                    value: "```" + `${whitelist.slice(0, 2000)}` + "```",
                },
            ]);
            return { embeds: [embed] };
        });
    }
    malware() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cmd.guild)
                return {
                    content: "Ha ocurrido un error.",
                    components: [],
                };
            const { guild } = this.cmd;
            const branding = yield (0, branding_1.getBranding)(guild);
            const blacklist = this.config.fileTypeBlacklist.split(",").join("\n");
            const embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ iconURL: branding === null || branding === void 0 ? void 0 : branding.icon, name: `${guild.name} moderation` })
                .setTitle("🪲 Escudo anti-malware 🪲")
                .setDescription("Evita el envío de archivos con ciertas extensiones para prevenir la descarga de archivos maliciosos por los miembros del servidor.")
                .setColor((branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xffffff)
                .setFields([
                {
                    name: "Blacklist",
                    value: "```" + `${blacklist.slice(0, 2000)}` + "```",
                },
            ]);
            return { embeds: [embed] };
        });
    }
    inside() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cmd.guild)
                return {
                    content: "Ha ocurrido un error.",
                    components: [],
                };
            const { guild } = this.cmd;
            const branding = yield (0, branding_1.getBranding)(guild);
            const embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ iconURL: branding === null || branding === void 0 ? void 0 : branding.icon, name: `${guild.name} moderation` })
                .setTitle("🦊 Prevención ante ataques interiores 🦊")
                .setDescription("Toma cuidado de las acciones de la administración para evitar ataques de origen interior.")
                .setColor((branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xffffff)
                .setFields([
                {
                    name: "Estado de emergencia",
                    value: "Realiza un backup del servidor de emergencia, para que todos los datos puedan ser recuperados más tarde.",
                },
                {
                    name: "Desactivación",
                    value: "En caso de raid, puede ser conveniente retirar estas medidas para que el equipo de staff pueda mitigar a los atacantes sin que el bot tome medidas contra el equipo.",
                },
            ]);
            return { embeds: [embed] };
        });
    }
    backup() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cmd.guild)
                return {
                    content: "Ha ocurrido un error.",
                    components: [],
                };
            const { guild } = this.cmd;
            const branding = yield (0, branding_1.getBranding)(guild);
            const embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ iconURL: branding === null || branding === void 0 ? void 0 : branding.icon, name: `${guild.name} moderation` })
                .setTitle("🔁 Backup del servidor 🔁")
                .setDescription("Crea un backup con todos los canales, contenidos importantes, roles, normas, y crea listas de información necesarias en caso de reparación del servidor.")
                .setColor((branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xffffff)
                .setFields([
                {
                    name: "Crear backup del servidor",
                    value: "Los backups del servidor se ejecutan periódicamente, pero puedes realizar uno manualmente presionando el botón de aquí abajo:",
                },
            ]);
            return { embeds: [embed] };
        });
    }
}
exports.ModerationInterface = ModerationInterface;
const warnEmbed = (guild, reason) => __awaiter(void 0, void 0, void 0, function* () {
    const branding = yield (0, branding_1.getBranding)(guild);
    const embed = new discord_js_1.EmbedBuilder()
        .setAuthor({ iconURL: branding === null || branding === void 0 ? void 0 : branding.icon, name: `${guild.name} moderation` })
        .setTitle("Has recibido un timeout")
        .setDescription(reason)
        .setColor((branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xfffff)
        .setFooter({
        text: "Tu penalización está a la espera de revisión, muchas gracias por tu paciencia.",
    })
        .setThumbnail("https://pluspng.com/img-png/clock-clipart-png-clipart-simple-clock-2400.png");
    return embed;
});
exports.warnEmbed = warnEmbed;
//# sourceMappingURL=embeds.js.map