const json = require("./tickets.json");
const fs = require("fs");

const newData = {};
for (const [k, data] of Object.entries(json)) {
  data.message_onCreate = data.message.create;
  data.message_onDelete = data.message.delete;
  delete data.message;
  data.support = null;
  data.questions = [];
  data.feedbackChannel = null;
  dmTranscript = "false";
  number = 0;

  newData[k] = data;
}

fs.writeFileSync("./data.json", JSON.stringify(newData, null, 2));
