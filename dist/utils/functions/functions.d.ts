import { createFor } from "./collectors/createFor";
import { modal } from "./discord/modal";
import { logs } from "./discord/logs";
import { parseDate } from "./string/parseDate";
import { emoji } from "../api/functions/emoji";
import { url } from "./string/url";
import { snowflake } from "./string/snowflake";
import { id } from "./string/id";
import ResponsiveEmbed from "./interfaces/embedPages";
declare const collector: {
    createFor: typeof createFor;
};
declare const dates: {
    parseDate: typeof parseDate;
};
declare const interfaces: {
    ResponsiveEmbed: typeof ResponsiveEmbed;
};
export { modal, collector, logs, dates, emoji, url, snowflake, id, interfaces };
