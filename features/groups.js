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
    case "grjdjdj":
    case "group":
    case "grup":
      reinbot.busy = true;
      logCommand();
      if (!isMe && !isOwner) {
        await onlyOwner();
        reinbot.busy = false;
        return;
      }
      try {
        const allGroups = await reinbot.groupFetchAllParticipating();
        if (
          !allGroups ||
          allGroups.length === 0 ||
          !Object.values(allGroups) ||
          Object.values(allGroups).length === 0
        ) {
          logger(
            "error",
            "GROUP",
            `‼️\x20\x20\x1b[1mData group ${
              allGroups.length || 0
            }\x1b[0m\n\x20\x20\x1b[1mGabung lebih banyak group sekarang\x1b[0m\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${
              reinbot.tutorial.joinGroups
            }`
          );
          await replyCommand(
            `‼️\x20*Data group ${
              allGroups.length || 0
            }*\nGabung lebih banyak group sekarang\n*TUTORIAL:*\x20${
              reinbot.tutorial.joinGroups
            }`
          );
          reinbot.busy = false;
          return;
        } else {
          await replyCommand(
            `🎉\x20*Jumlah group yang sudah anda join:*\x20${
              Object.values(allGroups).length
            }\n\n${Object.values(allGroups)
              .map(
                (group, index) =>
                  `${index + 1}.\x20*Nama group:*\x20${
                    group.subject
                  }\n\x20\x20\x20*Group id:*\x20${
                    group.id.split("@")[0]
                  }\n\x20\x20\x20*Group owner:*\x20${
                    group.owner?.split("@")[0]
                  }\n\x20\x20\x20*Jumlah member:*\x20${
                    group.participants.length
                  }`
              )
              .join("\n\n")}`
          );
          reinbot.busy = false;
        }
      } catch (err) {
        logger("error", "SHOWGROUPS", err);
        await replyCommand(err);
        reinbot.busy = false;
      }
      break;
  }
};
