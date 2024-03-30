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
    case "users":
    case "user":
      reinbot.busy = true;
      logCommand();
      try {
        await replyCommand(
          `■\x20*SHOWUSERS*\x20┓\n┗\x20Melihat data pengguna\n■\x20*DROPUSERS*\x20┓\n┗\x20Menghapus semua data pengguna\n■\x20*SAVEUSERSV1*\x20┓\n┗\x20Menyimpan semua nomor member group kedalam data pengguna\n■\x20*SAVEUSERSV2*\x20GroupID\x20┓\n┗\x20Menyimpan semua nomor member group target id kedalam data pengguna`
        );
        reinbot.busy = false;
      } catch (err) {
        logger("error", "COMMAND USERS", err);
        await replyCommand(err);
        reinbot.busy = false;
      }
      break;
    case "showusers":
    case "showuser":
    case "su":
      reinbot.busy = true;
      logCommand();
      if (!isMe && !isOwner) {
        await onlyOwner();
        reinbot.busy = false;
        return;
      }
      require("../utils/readUsers")()
        .then(async (res) => {
          if (!res.data || res.data.length === 0) {
            logger(
              "error",
              "SHOWUSERS",
              `‼️\x20\x20\x1b[1mJumlah data pengguna saat ini ${
                res.data.length || 0
              }\x1b[0m\n\x20\x20Dapatkan data pengguna lebih banyak!\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${
                reinbot.tutorial.saveUsers
              }`
            );
            await replyCommand(
              `‼️\x20*Jumlah data pengguna saat ini ${
                res.data.length || 0
              }*\nDapatkan data pengguna lebih banyak!\n*TUTORIAL:*\x20${
                reinbot.tutorial.saveUsers
              }`
            );
            reinbot.busy = false;
          } else {
            await replyCommand(
              `🎉\x20*Jumlah data pengguna saat ini:\x20${res.data.length}*`
            );
            reinbot.busy = false;
          }
        })
        .catch(async (err) => {
          logger("error", "SHOWUSERS", err);
          await replyCommand(err);
          reinbot.busy = false;
        });
      break;
    case "dropusers":
    case "dropuser":
    case "du":
      reinbot.busy = true;
      logCommand();
      if (!isMe && !isOwner) {
        await onlyOwner();
        reinbot.busy = false;
        return;
      }
      await require("../utils/dropUsers")()
        .then(async (res) => {
          if (!res.data || res.data.length === 0) {
            logger(
              "error",
              "DROPUSERS",
              `‼️\x20\x20\x1b[1mJumlah data pengguna saat ini ${
                res.data.length || 0
              }\x1b[0m\n\x20\x20Tidak ada data pengguna yang akan dihapus\n\x20\x20Dapatkan data pengguna lebih banyak!\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${
                reinbot.tutorial.saveUsers
              }`
            );
            await replyCommand(
              `‼️\x20*Jumlah data pengguna saat ini ${
                res.data.length || 0
              }*\nTidak ada data pengguna yang akan dihapus\nDapatkan data pengguna lebih banyak!\n*TUTORIAL:*\x20${
                reinbot.tutorial.saveUsers
              }`
            );
            reinbot.busy = false;
          } else {
            await replyCommand(
              `🎉\x20*${res.data.length} data pengguna telah berhasil dihapus*`
            );
            reinbot.busy = false;
          }
        })
        .catch(async (err) => {
          logger("error", "DROPUSERS", err);
          await replyCommand(err);
          reinbot.busy = false;
        });
      break;
    case "saveusersv1":
    case "saveuserv1":
    case "suv1":
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
      try {
        groupMetadata = await reinbot.groupMetadata(groupId);
        participants = groupMetadata.participants.map((part) => part.id);
        require("../utils/saveUsers")(participants)
          .then(async (res) => {
            await replyCommand(
              `🎉\x20*Target ditemukan*\n*Nama Group:*\x20${
                groupMetadata.subject
              }\n*Owner Group:*\x20${
                groupMetadata.owner?.split("@")[0]
              }\n*Jumlah member:*\x20${groupMetadata.participants.length}\n\n*${
                res.data.newUsers.length
              } pengguna telah berhasil disimpan!*`
            );
            reinbot.busy = false;
          })
          .catch(async (err) => {
            logger("error", "SAVEUSERSV1", err);
            await replyCommand(err);
            reinbot.busy = false;
          });
      } catch (err) {
        logger("error", "SAVEUSERSV1", err);
        await replyCommand(err);
        reinbot.busy = false;
      }
      break;
    case "saveusersv2":
    case "saveuserv2":
    case "suv2":
      reinbot.busy = true;
      logCommand();
      if (!isMe && !isOwner) {
        await onlyOwner();
        reinbot.busy = false;
        return;
      }
      if (!text || isNaN(parseInt(text))) {
        logger(
          "error",
          "SAVEUSERSV2",
          `‼️\x20\x20\x1b[1mPerintah kurang lengkap atau tidak valid\x1b[0m\n\x20\x20\x1b[1mContoh:\x1b[0m\x20.saveusersv2\x202763622651837\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${reinbot.tutorial.saveUsers}`
        );
        await replyCommand(
          `‼️\x20*Perintah kurang lengkap atau tidak valid*\n*Contoh:*\x20saveusersv2\x202763622651837\n\n*Tutorial:*\x20${reinbot.tutorial.saveUsers}`
        );
        reinbot.busy = false;
      }
      try {
        if (text.endsWith("@g.us")) {
          groupMetadata = await reinbot.groupMetadata(text);
        } else {
          groupMetadata = await reinbot.groupMetadata(`${text}@g.us`);
        }
        participants = groupMetadata.participants.map((part) => part.id);
        return require("../utils/saveUsers")(participants)
          .then(async (res) => {
            await replyCommand(
              `🎉\x20*Target ditemukan*\n*Nama Group:*\x20${
                groupMetadata.subject
              }\n*Owner Group:*\x20${
                groupMetadata.owner?.split("@")[0]
              }\n*Jumlah member:*\x20${groupMetadata.participants.length}\n\n*${
                res.data.newUsers.length
              } pengguna telah berhasil disimpan!*`
            );
            reinbot.busy = false;
          })
          .catch(async (err) => {
            logger("error", "SAVEUSERSV2", err);
            await replyCommand(err);
            reinbot.busy = false;
          });
      } catch (err) {
        logger("error", "SAVEUSERSV2", err);
        await replyCommand(err);
        reinbot.busy = false;
      }
      break;
  }
};
