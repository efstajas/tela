"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var construct_handler_context_1 = require("./methods/construct-handler-context");
exports.default = (function (req, res, next, appName, app) { return function (hookHandler) {
    hookHandler(req, res, next, construct_handler_context_1.default(appName, "" + appName.toLowerCase(), app));
}; });
