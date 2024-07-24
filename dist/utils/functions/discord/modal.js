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
exports.modal = void 0;
const discord_js_1 = require("discord.js");
/*************************************************************************
MODAL INPUT SPAMMING PREVENTION
************************************************************************/
// request
const awaitingRequests = new Map();
// if the user has more than 4 requests pending then we close
const userRequestSpamPrevention = (userId) => {
    // filter for every user pending to a interaction the user of this interaction
    const userRequests = [...awaitingRequests.values()].filter((id) => id === userId);
    if (userRequests.length > 4)
        return false;
    else
        return true;
};
/**
 * Crea un menu modal y maneja la respuesta.
 * @param modalBuilder
 * @param filter
 */
function listen(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { interaction, title, inputs } = data;
            // modal id
            const modalCustomId = `modal-${data.interaction.id}`;
            const modal = create({
                title,
                custom_id: modalCustomId,
                inputs,
            });
            // shows the modal to the user
            yield interaction.showModal(modal);
            // crear filtro para la recolección
            const filter = (response) => {
                // si no hay filtro para la respuesta
                if (!response || !response.message)
                    return false;
                return (
                // check if user is the same
                response.user.id === interaction.user.id &&
                    // check if messages are equal to prevent collecting wrong interaction
                    response.message.id === interaction.message.id &&
                    // searching for the response to this interaction
                    response.customId === modalCustomId);
            };
            // if we are awaiting to the same interaction then there is no need to await another interaction equal
            if (awaitingRequests.has(modalCustomId))
                throw new Error("Repeated modal.");
            //awaitingRequests.set(modalCustomId, interaction.user.id);
            // spam system to this user
            if (!userRequestSpamPrevention(interaction.user.id))
                throw new Error("This user is on spam prevention.");
            // awaiting interaction response
            const response = yield interaction
                .awaitModalSubmit({
                time: data.time || 60000,
                filter,
            })
                .catch(() => {
                return null;
            });
            // if there is no response return null
            if (!response)
                return null;
            // removes request from being awaited
            //awaitingRequests.delete(modalCustomId);
            // else parse values and return them
            const values = getValues(response);
            return { response, values };
        }
        catch (error) {
            // error handling
            console.log("[err] An error ocurred while trying to collect a modal interaction.", error);
            return null;
        }
    });
}
/**
 * Parsea la respuesta
 * @param modalBuilder
 * @param filter
 */
function getValues(submitted) {
    return Object.fromEntries(submitted.fields.components.map((actionRow) => {
        const data = actionRow.components[0];
        return [data.customId, data.value];
    }));
}
// simplifies the modal building
function create({ title, custom_id, inputs }) {
    // creates a modal with the desired data (primitive object)
    const modal = new discord_js_1.ModalBuilder({
        title,
        custom_id,
    });
    if (inputs.length < 1)
        throw new Error("There must be at least one text input builder.");
    // for each input passed
    for (const input of inputs) {
        const row = new discord_js_1.ActionRowBuilder().addComponents(input);
        modal.addComponents(row);
    }
    return modal;
}
/*************************************************************************
EXPORTS
************************************************************************/
const modal = {
    listen,
    getValues,
    create,
};
exports.modal = modal;
//# sourceMappingURL=modal.js.map