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
  switch (command) {
    case "contacts":
    case "contact":
    case "ct":
      reinbot.busy = true;
      logCommand();
      try {
        await replyCommand(
          `‼️\x20\x20*FITUR INI MASIH DALAM TAHAP PENGEMBANGAN*`
        );
        reinbot.busy = false;
      } catch (err) {
        logger("error", "CONTACTS", err);
        await replyCommand(err);
        reinbot.busy = false;
      }
      break;
  }
};
