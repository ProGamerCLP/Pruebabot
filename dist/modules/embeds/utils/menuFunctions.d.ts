declare const _default: {
    menuOption: {
        author: (m: import("discord.js").StringSelectMenuInteraction<import("discord.js").CacheType>, submitted: import("../../../utils/functions/discord/modal").SubmittedInputData, embed: import("discord.js").EmbedBuilder) => Promise<1 | undefined>;
        color: (m: import("discord.js").StringSelectMenuInteraction<import("discord.js").CacheType>, submitted: import("../../../utils/functions/discord/modal").SubmittedInputData, embed: import("discord.js").EmbedBuilder) => Promise<1 | import("discord.js").InteractionResponse<boolean>>;
        description: (m: import("discord.js").StringSelectMenuInteraction<import("discord.js").CacheType>, submitted: import("../../../utils/functions/discord/modal").SubmittedInputData, embed: import("discord.js").EmbedBuilder) => Promise<1 | import("discord.js").InteractionResponse<boolean>>;
        fieldAdd: (m: import("discord.js").StringSelectMenuInteraction<import("discord.js").CacheType>, submitted: import("../../../utils/functions/discord/modal").SubmittedInputData, embed: import("discord.js").EmbedBuilder) => number;
        fieldRemove: (m: import("discord.js").StringSelectMenuInteraction<import("discord.js").CacheType>, submitted: import("../../../utils/functions/discord/modal").SubmittedInputData, embed: import("discord.js").EmbedBuilder) => Promise<1 | import("discord.js").InteractionResponse<boolean>>;
        footer: (m: import("discord.js").StringSelectMenuInteraction<import("discord.js").CacheType>, submitted: import("../../../utils/functions/discord/modal").SubmittedInputData, embed: import("discord.js").EmbedBuilder) => Promise<1 | undefined>;
        image: (m: import("discord.js").StringSelectMenuInteraction<import("discord.js").CacheType>, submitted: import("../../../utils/functions/discord/modal").SubmittedInputData, embed: import("discord.js").EmbedBuilder) => Promise<void>;
        thumbnail: (m: import("discord.js").StringSelectMenuInteraction<import("discord.js").CacheType>, submitted: import("../../../utils/functions/discord/modal").SubmittedInputData, embed: import("discord.js").EmbedBuilder) => Promise<1 | undefined>;
        title: (m: import("discord.js").StringSelectMenuInteraction<import("discord.js").CacheType>, submitted: import("../../../utils/functions/discord/modal").SubmittedInputData, embed: import("discord.js").EmbedBuilder) => 1 | Promise<import("discord.js").InteractionResponse<boolean>>;
    };
};
export default _default;
