"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (components) {
    if (!Array.isArray(components))
        throw new Error('Expected array of components to be returned by handler.');
    return {
        canvas: {
            content: {
                components: components
            }
        }
    };
});
