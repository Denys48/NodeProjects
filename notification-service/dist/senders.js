"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushSender = exports.smsSender = exports.emailSender = void 0;
exports.logger = logger;
exports.sendWithLogging = sendWithLogging;
exports.emailSender = Object.assign(async (notification) => {
    console.log(notification);
    return { ok: true, messageId: "as189", sentAt: new Date };
}, {
    channel: "email",
    isAvailable: () => true
});
exports.smsSender = Object.assign(async (notification) => {
    console.log(notification);
    return { ok: true, messageId: "as189", sentAt: new Date };
}, {
    channel: "sms",
    isAvailable: () => true
});
exports.pushSender = Object.assign(async (notification) => {
    console.log(notification);
    return { ok: true, messageId: "as139", sentAt: new Date() };
}, {
    channel: "push",
    isAvailable: () => true
});
function logger(data) {
    if (data.ok) {
        console.log(`Message: ${data.messageId}, sent at: ${data.sentAt}`);
        return;
    }
    console.log(`Error: ${data.error}, retryable: ${data.retryable}`);
}
async function sendWithLogging(payload, sender, logger) {
    const sendData = await sender(payload);
    logger(sendData);
}
