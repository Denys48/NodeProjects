import { describe } from "./payload";
import type { NotificationPayload } from "./payload";

function isNotificationPayload(value: unknown): value is NotificationPayload {
    if (typeof value !== "object" || value === null){
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
            return (
                "to" in value && typeof value.to === "string" && 
                "subject" in value && typeof value.subject === "string" &&
                "body" in value && typeof value.body === "string" &&
                (!("attachments" in value) ||
                    (Array.isArray(value.attachments) &&
                    value.attachments.every(item => typeof item === "string")))
            );
        case "sms":
            return (
                "to" in value && typeof value.to === "string" &&
                "text" in value && typeof value.text === "string"
            );
        case "push":
            return (
                "deviceToken" in value && typeof value.deviceToken === "string" &&
                "title" in value && typeof value.title === "string" &&
                "body" in value && typeof value.body === "string" &&
                (!("badge" in value) || typeof value.badge === "number")
            );
        case "telegram":
            return (
                "chatId" in value && typeof value.chatId === "string" &&
                "text" in value && typeof value.text === "string"
            );
        default:
            return false;
    }
}

export function handleIncoming(raw: unknown) {
    if(!isNotificationPayload(raw)){
        console.error("Invalid notification payload");
    } else{
        describe(raw);
    }
}

export {};