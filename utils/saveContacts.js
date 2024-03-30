const logger = require("./logger");
const getDateTime = require("./getDateTime");

module.exports = async (reinbot, msg, participants, name) => {
  reinbot.busy = true;
  try {
    const bufferVcard = participants
      .map((part, index) => {
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\x20-\x20${
          index + 1
        }\nORG:${reinbot.owner.name}\nTEL;type=CELL;type=VOICE;waid=${
          part.split("@")[0]
        }:+${part.split("@")[0]}\nEND:VCARD`;
      })
      .join("\n");
    await reinbot.sendMessage(
      msg.key.remoteJid,
      {
        document: Buffer.from(bufferVcard),
        fileName: "Contacts.vcf",
        caption: `⚡\x20*${
          reinbot.name
        }\x20ヅ*\x20|\x20*SAVE KONTAK*\n\n🎉\x20*${
          participants.length
        } pengguna telah berhasil disimpan ke dalam file Contacts.vcf*\n\n*⌱\x20${getDateTime()}*`,
        mimetype: "text/vcard",
      },
      { quoted: msg }
    );
    reinbot.busy = false;
  } catch (err) {
    logger(`error`, "SAVEKONTAK", err);
    await reinbot.sendMessage(
      msg.key.remoteJid,
      {
        text: `⚡\x20*${
          reinbot.name
        }\x20ヅ*\x20|\x20*SAVE KONTAK*\n\n${err}\n\n*⌱\x20${getDateTime()}*`,
      },
      { quoted: msg }
    );
    reinbot.busy = false;
  }
};
