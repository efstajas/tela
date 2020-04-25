"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (appName, path, app) {
    var methods = {};
    var hooks = {};
    for (var _i = 0, _a = Object.keys(app); _i < _a.length; _i++) {
        var method = _a[_i];
        if (method === 'hooks') {
            for (var _b = 0, _c = Object.keys(app.hooks); _b < _c.length; _b++) {
                var hook = _c[_b];
                hooks[hook] = {
                    endpoint: path + "/hooks/" + hook.toLowerCase()
                };
            }
        }
        else {
            methods[method] = {
                endpoint: path + "/" + method.toLowerCase()
            };
        }
    }
    return {
        appName: appName,
        endpoint: "" + path,
        methods: methods,
        hooks: hooks,
    };
});
