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
    case "savechwhhddontacts":
    case "savecondjsjdtact":
    case "savekonffedvfdtak":
    case "sk":
      reinbot.busy = true;
      logCommand();
      try {
        await replyCommand(
          `■\x20*SAVEKONTAKV1*\x20┓\n┗\x20Menyimpan semua nomor pengguna kedalam kontak\n■\x20*SAVEKONTAKV2*\x20┓\n┗\x20Menyimpan semua nomor anggota group kedalam kontak\n■\x20*SAVEKONTAKV3*\x20┓\n┗\x20Menyimpan semua nomor anggota group target id kedalam kontak`
        );
        reinbot.busy = false;
      } catch (err) {
        logger("error", "SAVEKONTAK", err);
        await replyCommand(err);
        reinbot.busy = false;
      }
      break;
    case "savecontjdjjfactsv1":
    case "savecovhjwjdntactv1":
    case "savekontjdndnakv1":
    case "skv1":
      reinbot.busy = true;
      logCommand();
      if (!isMe && !isOwner) {
        await onlyOwner();
        reinbot.busy = false;
        return;
      }
      if (!text) {
        logger(
          "error",
          "SAVEKONTAKV1",
          `‼️\x20\x20\x1b[1mPerintah kurang lengkap atau tidak valid\x1b[0m\n\x20\x20\x1b[1mContoh:\x1b[0m\x20.savekontakv1\x20World\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${reinbot.tutorial.saveContacts}`
        );
        await replyCommand(
          `‼️\x20*Perintah kurang lengkap atau tidak valid*\n*Contoh:*\x20.savekontakv1\x20world\n*TUTORIAL:*\x20${reinbot.tutorial.saveContacts}`
        );
        reinbot.busy = false;
        return;
      }
      require("../utils/readUsers")()
        .then(async (res) => {
          if (!res.data || res.data.length === 0) {
            logger(
              "error",
              "SAVEKONTAKV1",
              `‼️\x20\x20\x1b[1mData pengguna ${
                res.data.length || 0
              }\n\x20\x20Dapatkan data pengguna lebih banyak!\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${
                reinbot.tutorial.saveUsers
              }`
            );
            await replyCommand(
              `‼️\x20*Data pengguna ${
                res.data.length || 0
              }*\nDapatkan data pengguna lebih banyak!\n*TUTORIAL:*\x20${
                reinbot.tutorial.saveUsers
              }`
            );
            reinbot.busy = false;
            return;
          }
          await replyCommand(
            `🎉\x20*SAVE KONTAK START*\n*Target:*\x20${res.data.length}\x20pengguna`
          );
          return require("../utils/saveContacts")(reinbot, msg, res.data, text);
        })
        .catch(async (err) => {
          logger("error", "PUSHKONTAKV1", err);
          await replyCommand(err);
          reinbot.busy = false;
        });
      break;
    case "savecontghndncactsv2":
    case "savecontaxhdhdctv2":
    case "savekoxhdhdntakv2":
    case "skv2":
      reinbot.busy = true;
      logCommand();
      if (!isMe && !isOwner) {
        await onlyOwner();
        reinbot.busy = false;
        return;
      }
      if (!isGroup) {
        await onlyGroup();
        reinbot.busy = false;
        return;
      }
      if (!text) {
        logger(
          "error",
          "SAVEKONTAKV2",
          `‼️\x20\x20\x1b[1mPerintah kurang lengkap atau tidak valid\x1b[0m\n\x20\x20\x1b[1mContoh:\x1b[0m\x20.savekontakv2\x20World\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${reinbot.tutorial.saveContacts}`
        );
        await replyCommand(
          `‼️\x20*Perintah kurang lengkap atau tidak valid*\n*Contoh:*\x20.savekontakv2\x20world\n*TUTORIAL:*\x20${reinbot.tutorial.saveContacts}`
        );
        reinbot.busy = false;
        return;
      }
      try {
        groupMetadata = await reinbot.groupMetadata(groupId);
        participants = groupMetadata.participants.map((part) => part.id);
        await replyCommand(
          `🎉\x20*SAVE KONTAK START*\n*Nama group:*\x20${
            groupMetadata.subject
          }\n*Owner:*\x20${groupMetadata.owner?.split("@")[0]}\n*Target:*\x20${
            participants.length
          }\x20pengguna`
        );
        return require("../utils/saveContacts")(
          reinbot,
          msg,
          participants,
          text
        );
      } catch (err) {
        logger("error", "SAVEKONTAKV2", err);
        await replyCommand(err);
        reinbot.busy = false;
      }
      break;
    case "savecontacndndndtsv3":
    case "savecontxdjdjactv3":
    case "savekontahdhxhdkv3":
    case "skv3":
      reinbot.busy = true;
      logCommand();
      if (!isMe && !isOwner) {
        await onlyOwner();
        reinbot.busy = false;
        return;
      }
      if (!text || !text.split("|")[0] || !text.split("|")[1]) {
        logger(
          "error",
          "SAVEKONTAKV3",
          `‼️\x20\x20\x1b[1mPerintah kurang lengkap atau tidak valid\x1b[0m\n\x20\x20\x1b[1mContoh:\x1b[0m\x20.savekontakv3\x20638165378166218|World\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${reinbot.tutorial.saveContacts}`
        );
        await replyCommand(
          `‼️\x20*Perintah kurang lengkap atau tidak valid*\n*Contoh:*\x20.savekontakv3\x20638165378166218|world\n*TUTORIAL:*\x20${reinbot.tutorial.saveContacts}`
        );
        reinbot.busy = false;
        return;
      }
      try {
        if (text.split("|")[0].endsWith("@g.us")) {
          groupMetadata = await reinbot.groupMetadata(text.split("|")[0]);
        } else {
          groupMetadata = await reinbot.groupMetadata(
            `${text.split("|")[0]}@g.us`
          );
        }
        participants = groupMetadata.participants.map((part) => part.id);
        await replyCommand(
          `🎉\x20*SAVE KONTAK START*\n*Nama group:*\x20${
            groupMetadata.subject
          }\n*Owner:*\x20${groupMetadata.owner?.split("@")[0]}\n*Target:*\x20${
            participants.length
          }\x20pengguna`
        );
        return require("../utils/saveContacts")(
          reinbot,
          msg,
          participants,
          text.split("|")[1]
        );
      } catch (err) {
        logger("error", "SAVEKONTAKV3", err);
        await replyCommand(err);
        reinbot.busy = false;
      }
      break;
  }
};
