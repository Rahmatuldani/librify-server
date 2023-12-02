"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function response(res, { status = 200, message, data = {} }) {
    if (status >= 400 && status < 500) {
        return res.status(status).json({
            status: 'failed',
            message,
            data
        });
    }
    if (status >= 500 && status < 600) {
        return res.status(status).json({
            status: 'error',
            message,
            data
        });
    }
    return res.status(status).json({
        status: 'success',
        message,
        data
    });
}
exports.default = response;
