"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const c = (str) => "```" + str + "```";
exports.default = {
    // ctx = string
    badword: (ctx) => ({
        description: `Envío de palabras baneadas en el servidor.`,
        provided: {
            name: "Palabra",
            value: c(ctx || "Ha ocurrido un error"),
        },
    }),
    spam: (ctx) => ({
        description: `Envío de urls externas.`,
        provided: {
            name: "Url enviada",
            value: c(ctx || "Ha ocurrido un error"),
        },
    }),
    invite: (ctx) => ({
        description: `Envío de invitaciones externas al servidor.`,
        provided: {
            name: "Invitación enviada",
            value: c(ctx || "Ha ocurrido un error"),
        },
    }),
    // ctx => {chain: number, interval: number, names: string[]}
    channelCreate: (ctx) => ({
        description: `${ctx.chain} canales creados en menos de ${ctx.interval} segundos`,
        provided: {
            name: "Último canal actualizado",
            value: c(ctx.channel.name),
        },
    }),
    channelDelete: (ctx) => ({
        description: `${ctx.chain} canales eliminados en menos de ${ctx.interval} segundos`,
        provided: {
            name: "Último canal actualizado",
            value: c(ctx.channel.name),
        },
    }),
    flood: (ctx) => ({
        description: `${ctx.chain} mensajes enviados en menos de ${ctx.interval} segundos.`,
        provided: {
            name: "Mensaje",
            value: c(ctx.message || "Ha ocurrido un error"),
        },
    }),
    massBan: (ctx) => ({
        description: `${ctx.chain} usuarios baneados en menos de ${ctx.interval} segundos.`,
        provided: {
            name: "Último usuario baneado",
            value: c(ctx.target),
        },
    }),
    massKick: (ctx) => ({
        description: `${ctx.chain} usuarios expulsados en menos de ${ctx.interval} segundos.`,
        provided: {
            name: "Último usuario kickeado",
            value: c(ctx.target),
        },
    }),
    ip: (ctx) => ({
        description: `Envío de dirección IP por chat público`,
        provided: {
            name: "Dirección",
            value: c("No podemos mostrar la dirección ip por las políticas de discord."),
        },
    }),
    suspiciousFile: (ctx) => ({
        description: `Envío de archivos de extensión sospechosa`,
        provided: {
            name: "Extensión de los archivos",
            value: c(ctx.map((a) => `${a.name}; ${a.contentType}`).join("\n")),
        },
    }),
    // ctx = map<roleId, number>
    massRoleGiving: (ctx) => ({
        description: `Demasiados roles añadidos en poco tiempo`,
        provided: {
            name: "Roles",
            value: `${ctx
                .entries()
                .map((e) => `<#${e[0]}>: ${e[1]}`)
                .join("\n")}`,
        },
    }),
    mentions: (ctx) => ({
        description: `Mención de @everyone o @here`,
        provided: {
            name: "Mensaje",
            value: c(ctx.content || "Este mensaje no tiene contenido."),
        },
    }),
};
//# sourceMappingURL=reasons.js.map