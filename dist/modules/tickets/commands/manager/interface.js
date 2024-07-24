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
exports.messageInterface = void 0;
const discord_js_1 = require("discord.js");
const components_1 = require("./components");
const module_1 = require("../../module");
const branding_1 = require("../../../../utils/api/functions/branding");
// creates the embed interface
function messageInterface(book, guild) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, paragraph: i } = book;
        const branding = yield (0, branding_1.getBranding)(guild);
        const EPP = Number(module_1.module.config.get("entriesPerPage"));
        const E = yield module_1.module.data.all();
        const pages = yield book.getLength();
        const pageElements = E.slice((page - 1) * EPP, (page - 1) * EPP + EPP);
        const des = pageElements.length < 1
            ? "No hay tickets actualmente. Presiona el botón verde para añadir uno nuevo."
            : pageElements
                .map((tk, j) => {
                // DESCRIPCIÓN //
                const v = tk.value;
                const header = `┌ ${tk.key} - ${v.label} ${v.emoji || ""}`;
                const desc = v.description
                    ? `├ Descripción: ${v.description.split("\n")[0].slice(0, 50)}`
                    : null;
                const sec = v.parent ? `├ Categoría: <#${v.parent}>` : null;
                const sup = v.support ? `├ Soporte: <@&${v.support}>` : null;
                const dmt = v.dmTranscript
                    ? `├ DM Transcript: ${v.dmTranscript}`
                    : null;
                const trn = v.transcriptChannel
                    ? `├  Transcripts: <#${v.transcriptChannel}>`
                    : null;
                const msg = `└ Mensajes:
          ㅤ├ Al abrir: ${v.message_onCreate ? "Personalizado" : "Sin personalizar"}.
          ㅤ└ Al Cerrar: ${v.message_onDelete ? "Personalizado" : "Sin personalizar."}
          `;
                const q = v.questions.length > 0
                    ? "Preguntas:\n" +
                        v.questions
                            .map((q, i) => `├ ${i + 1}. ${q}`)
                            .join("\n")
                    : null;
                return [header, desc, sec, trn, sup, dmt, q, msg]
                    .filter((str) => str)
                    .map((str) => (i === j + 1 ? `**${str}**` : str)) // subrayado de seleccion
                    .join("\n");
                // DESCRIPCIÓN //
            })
                .join("\n");
        // embed presets
        const embed = new discord_js_1.EmbedBuilder()
            .setAuthor({ iconURL: branding === null || branding === void 0 ? void 0 : branding.icon, name: `${guild.name}` })
            .setTitle("🎫 Ticket Manager 🎫")
            .setColor("Blurple")
            .setDescription(des)
            .setThumbnail((branding === null || branding === void 0 ? void 0 : branding.icon) || "")
            .setColor((branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xffffff);
        if (pages !== 0)
            embed.setFooter({ text: `Página ${page}/${pages}` });
        const components = (0, components_1.ticketManagerComponents)();
        let x = E.length === 0 ? true : false;
        components[2].components[0].setDisabled(x);
        components[1].components[3].setDisabled(x);
        return {
            content: undefined,
            embeds: [embed],
            components,
        };
    });
}
exports.messageInterface = messageInterface;
//# sourceMappingURL=interface.js.map