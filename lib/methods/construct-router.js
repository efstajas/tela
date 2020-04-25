"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var call_hook_1 = require("../call-hook");
var call_app_method_1 = require("../call-app-method");
exports.default = (function (appName, app) {
    var router = express_1.Router();
    var appObject = app;
    var _loop_1 = function (key) {
        switch (key) {
            case 'hooks':
                if (!app.hooks)
                    break;
                var _loop_2 = function (hook) {
                    var path_1 = "/hooks/" + hook.toLowerCase();
                    router.post(path_1 + "*", function (req, res, next) { return call_hook_1.default(req, res, next, appName, app)(app.hooks[hook]); });
                };
                for (var _i = 0, _a = Object.keys(app.hooks); _i < _a.length; _i++) {
                    var hook = _a[_i];
                    _loop_2(hook);
                }
                break;
            default:
                if (!['initialize', 'submit', 'configure'].includes(key))
                    break;
                var path = "/" + key.toLowerCase();
                router.post(path, function (req, res, next) { return call_app_method_1.default(appName, req, res, next, app)(appObject[key]); });
                break;
        }
    };
    for (var _i = 0, _a = Object.keys(app); _i < _a.length; _i++) {
        var key = _a[_i];
        _loop_1(key);
    }
    return router;
});
