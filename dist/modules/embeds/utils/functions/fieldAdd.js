"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (m, submitted, embed) => {
    // get new field values
    const name = submitted.values.name;
    const value = submitted.values.value;
    let inline = submitted.values.inline;
    let fields = embed.data.fields || [];
    fields.push({
        name,
        value,
        inline: inline ? true : false,
    });
    embed.setFields(fields);
    return 1;
};
//# sourceMappingURL=fieldAdd.js.map