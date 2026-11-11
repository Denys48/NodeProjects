"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.describe = describe;
const CHANNELS = ["email", "sms", "push", "telegram"];
function describe(payload) {
    switch (payload.channel) {
        case "email":
            return `Email to ${payload.to}: ${payload.subject}. Priority: ${payload.priority}`;
        case "sms":
            return `SMS to ${payload.to}: ${payload.text}. Priority: ${payload.priority}`;
        case "push":
            return `Push notification to ${payload.deviceToken}: ${payload.title}. Priority: ${payload.priority}`;
        case "telegram":
            return `Push notification to ${payload.chatId}: ${payload.text}. Priority: ${payload.priority}`;
        default: {
            const exhaustive = payload;
            throw new Error(`Невідомий канал: ${JSON.stringify(exhaustive)}`);
        }
    }
}
// function describeWithError(payload: NotificationPayload): string {
//     switch(payload.channel){
//         case "email":
//             return `Email to ${payload.to}: ${payload.subject}. Priority: ${payload.priority}`;
//         case "sms":
//             return `SMS to ${payload.to}: ${payload.subject}. Priority: ${payload.priority}`;
//         case "push":
//             return `Push notification to ${payload.deviceToken}: ${payload.title}. Priority: ${payload.priority}`;
//     }
// }
// Property 'subject' does not exist on type 'SMS'.
// 45             return `SMS to ${payload.to}: ${payload.subject}. Priority: ${payload.priority}`;
// error TS2322: Type 'Telegram' is not assignable to type 'never'.
// 44             const exhaustive: never = payload;
