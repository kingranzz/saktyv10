const { writeFile } = require("fs/promises");
const { join } = require("path");

module.exports = async (
  reinbot,
  msg,
  id,
  media,
  isGroup,
  userId,
  groupId,
  isMe,
  isOwner,
  msgType,
  msgText,
  command,
  text,
  logCommand,
  reply,
  replyCommand,
  onlyOwner,
  onlyGroup,
  setting,
  groupMetadata,
  participants,
  logger
) => {
  const showSetting = async () => {
    reinbot.busy = true;
    await replyCommand(
      `■\x20*ANTICALL*\x20┓\x20\x20${
        setting.features.antiCall.status ? "✅" : "❌"
      }\n┗\x20Menolak semua panggilan masuk\n■\x20*SAFEMODE*\x20┓\x20\x20${
        setting.features.safeMode.status ? "✅" : "❌"
      }\n┗\x20Bot mode fokus (bot diam ketika sedang sibuk)`
    );
    reinbot.busy = false;
    return;
  };
  switch (command) {
    case "setting":
    case "set":
      logCommand();
      showSetting();
      break;
    case "antiycall":
    case "ac":
      reinbot.busy = true;
      logCommand();
      try {
        setting.features.antiCall.status = !setting.features.antiCall.status;
        await writeFile(
          join(__dirname, "../data/setting.json"),
          JSON.stringify(setting)
        );
        showSetting();
        reinbot.busy = false;
      } catch (err) {
        logger("error", "ANTICALL", err);
        await replyCommand(err);
        reinbot.busy = false;
      }
      break;
    case "safemojjde":
    case "sm":
      reinbot.busy = true;
      logCommand();
      try {
        setting.features.safeMode.status = !setting.features.safeMode.status;
        await writeFile(
          join(__dirname, "../data/setting.json"),
          JSON.stringify(setting)
        );
        showSetting();
        reinbot.busy = false;
      } catch (err) {
        logger("error", "ANTICALL", err);
        await replyCommand(err);
        reinbot.busy = false;
      }
      break;
  }
};
