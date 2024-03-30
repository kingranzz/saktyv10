const moment = require("moment");

module.exports = () => {
  const date = moment().format("LL");
  const time = moment().format("LTS");
  return `${time}\x20${date}`;
};
