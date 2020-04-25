"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constructHandlerContext_1 = require("./methods/constructHandlerContext");
exports.default = (function (req, res, next, appName, app) { return function (hookHandler) {
    hookHandler(req, res, next, constructHandlerContext_1.default(appName, "" + appName.toLowerCase(), app));
}; });
