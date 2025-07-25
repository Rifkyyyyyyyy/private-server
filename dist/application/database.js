"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prismaClient = void 0;
var _client = require("@prisma/client");
var _logger = require("./logger.js");
var prismaClient;
try {
  exports.prismaClient = prismaClient = new _client.PrismaClient({
    log: [{
      emit: "event",
      level: "query"
    }, {
      emit: "event",
      level: "error"
    }, {
      emit: "event",
      level: "info"
    }, {
      emit: "event",
      level: "warn"
    }]
  });

  // Event listeners Prisma
  prismaClient.$on("error", function (e) {
    var _logger$error;
    _logger.logger === null || _logger.logger === void 0 || (_logger$error = _logger.logger.error) === null || _logger$error === void 0 || _logger$error.call(_logger.logger, "Prisma Error:", e);
  });
  prismaClient.$on("warn", function (e) {
    var _logger$warn;
    _logger.logger === null || _logger.logger === void 0 || (_logger$warn = _logger.logger.warn) === null || _logger$warn === void 0 || _logger$warn.call(_logger.logger, "Prisma Warning:", e);
  });
  prismaClient.$on("info", function (e) {
    var _logger$info;
    _logger.logger === null || _logger.logger === void 0 || (_logger$info = _logger.logger.info) === null || _logger$info === void 0 || _logger$info.call(_logger.logger, "Prisma Info:", e);
  });
  prismaClient.$on("query", function (e) {
    var _logger$info2;
    _logger.logger === null || _logger.logger === void 0 || (_logger$info2 = _logger.logger.info) === null || _logger$info2 === void 0 || _logger$info2.call(_logger.logger, "Query: ".concat(e.query, " | Duration: ").concat(e.duration, "ms"));
  });
} catch (err) {
  console.error("❌ Failed to initialize PrismaClient:", err);
  process.exit(1); // Stop app kalau Prisma gagal
}