module.exports = (reinbot, store) => {
  reinbot.name = "Ranbotz";
  reinbot.version = "1";
  reinbot.store = store;
  reinbot.developer = {
    name: "Ranz Coll",
    number: "6282393734303",
    whatsapp: "https://wa.me/6282393734303",
  };
  reinbot.owner = {
    name: "Ranz Coll",
    number: "6282393734303",
    whatsapp: "https://wa.me/6282393734303",
  };
  reinbot.busy = false;
  reinbot.broadcast = {
    delay: 50000,
    limit: 25,
  };
  reinbot.pushcontact = {
    delay: 50000,
    limit: 1000,
  };
  reinbot.tutorial = {
    saveUsers: "https://wa.me/6282393734303",
    joinGroups: "https://wa.me/6282393734303",
    broadcast: "https://wa.me/6282393734303",
    pushContacts: "https://wa.me/6282393734303",
    saveContacts: "https://wa.me/6282393734303",
  };
};
