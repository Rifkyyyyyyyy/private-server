"use strict";

var _web = require("./application/web.js");
var _logger = require("./application/logger.js");
var PORT = process.env.APP_PORT || 3000;
_web.web.listen(PORT, function () {
  _logger.logger.info("\u2705 Aplikasi berjalan di PORT: ".concat(PORT));
});