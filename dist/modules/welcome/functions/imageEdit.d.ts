import { StringSelectMenuInteraction } from "discord.js";
type I = StringSelectMenuInteraction;
type obj = {
    [key: string]: string;
};
declare const _default: {
    avatar_cords: (i: I, input: obj) => Promise<void>;
    text_cords: (i: I, input: obj) => Promise<void>;
    avatar_size: (i: I, input: obj) => Promise<void>;
    background: (i: I, input: obj) => Promise<void>;
    text: (i: I, input: obj) => void;
    message_public: (i: I, input: obj) => Promise<void>;
    message_private: (i: I, input: obj) => Promise<void>;
    channelId: (i: I, input: obj) => Promise<void>;
};
export default _default;
