"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIncoming = handleIncoming;
const payload_1 = require("./payload");
function isNotificationPayload(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    if (!("channel" in value) || !("priority" in value)) {
        return false;
    }
    if (value.priority !== "low" && value.priority !== "normal" && value.priority !== "high") {
        return false;
    }
    switch (value.channel) {
        case "email":
            return ("to" in value && typeof value.to === "string" &&
                "subject" in value && typeof value.subject === "string" &&
                "body" in value && typeof value.body === "string" &&
                (!("attachments" in value) ||
                    (Array.isArray(value.attachments) &&
                        value.attachments.every(item => typeof item === "string"))));
        case "sms":
            return ("to" in value && typeof value.to === "string" &&
                "text" in value && typeof value.text === "string");
        case "push":
            return ("deviceToken" in value && typeof value.deviceToken === "string" &&
                "title" in value && typeof value.title === "string" &&
                "body" in value && typeof value.body === "string" &&
                (!("badge" in value) || typeof value.badge === "number"));
        case "telegram":
            return ("chatId" in value && typeof value.chatId === "string" &&
                "text" in value && typeof value.text === "string");
        default:
            return false;
    }
}
function handleIncoming(raw) {
    if (!isNotificationPayload(raw)) {
        console.error("Invalid notification payload");
    }
    else {
        (0, payload_1.describe)(raw);
    }
}
