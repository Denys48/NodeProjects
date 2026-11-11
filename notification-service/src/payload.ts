const CHANNELS = ["email", "sms", "push", "telegram"] as const;
export type Channel = typeof CHANNELS[number];

interface BaseNotification {
    priority: "low" | "normal" | "high";
}

interface Email extends BaseNotification {
    channel: Extract<Channel, "email">;
    to: string;
    subject: string;
    body: string;
    attachments?: string[];
}

interface SMS extends BaseNotification {
    channel: Extract<Channel, "sms">;
    to: string;
    text: string;
}

interface Push extends BaseNotification {
    channel: Extract<Channel, "push">;
    deviceToken: string;
    title: string;
    body: string;
    badge?: number;
}

interface Telegram extends BaseNotification{ 
    channel: Extract<Channel, "telegram">; 
    chatId: string; 
    text: string 
}

export type NotificationPayload = Email | SMS | Push | Telegram;

export function describe(payload: NotificationPayload): string {
    switch(payload.channel){
        case "email":
            return `Email to ${payload.to}: ${payload.subject}. Priority: ${payload.priority}`;
        case "sms":
            return `SMS to ${payload.to}: ${payload.text}. Priority: ${payload.priority}`;
        case "push":
            return `Push notification to ${payload.deviceToken}: ${payload.title}. Priority: ${payload.priority}`;
        case "telegram":
            return `Push notification to ${payload.chatId}: ${payload.text}. Priority: ${payload.priority}`;
        default: {
            const exhaustive: never = payload;
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