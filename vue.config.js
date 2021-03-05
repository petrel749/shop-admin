const path = require("path");
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.join(__dirname, "src"))
      .set("@c", path.join(__dirname, "src/components"))
      .set("@v", path.join(__dirname, "src/views"));
  }
};
