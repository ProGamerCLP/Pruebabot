"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.presences = void 0;
const discord_js_1 = require("discord.js");
// Presence list
const presences = [
  {
    label: (ctx) => `El Renacer RP 🦅`,
    type: discord_js_1.ActivityType.Playing,
    status: "online",
    parameter: (client) =>
      __awaiter(void 0, void 0, void 0, function* () {
        return null;
      }),
  },
  {
    label: (ctx) => `${ctx} Miembros`,
    type: discord_js_1.ActivityType.Listening,
    status: "online",
    parameter: (client) =>
      __awaiter(void 0, void 0, void 0, function* () {
        if (process.env.guild) {
          return yield client.guilds.fetch(process.env.guild || "");
        } else {
          return client.guilds.cache
            .map((guild) => guild.memberCount)
            .reduce((a, b) => a + b);
        }
      }),
  },
  {
    label: (ctx) => `FiveM✨`,
    type: discord_js_1.ActivityType.Playing,
    status: "online",
    parameter: (client) =>
      __awaiter(void 0, void 0, void 0, function* () {
        return null;
      }),
  },
];
exports.presences = presences;
//# sourceMappingURL=presences.js.map
