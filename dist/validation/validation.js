"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;
var _apiErrorUtils = require("../utils/apiError-utils.js");
var validate = exports.validate = function validate(schema, request) {
  var result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false
  });
  if (result.error) {
    var message = result.error.details.map(function (d) {
      return d.message;
    }).join(', ');
    throw new _apiErrorUtils.ApiError(400, "Validation failed: ".concat(message));
  }
  return result.value;
};