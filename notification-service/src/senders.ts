import { NotificationPayload, Channel } from "./payload";

type SendResult =
  | { ok: true; messageId: string; sentAt: Date }
  | { ok: false; error: string; retryable: boolean };

interface Sender {
    (notification: NotificationPayload): Promise<SendResult>;
    channel: Channel;
    isAvailable(): boolean;
}

interface SendLogger {
    (data: SendResult): void;
}

export const emailSender: Sender = Object.assign(
    async (notification: NotificationPayload): Promise<SendResult> => {
        console.log(notification);
        return {ok: true, messageId: "as189", sentAt: new Date}
    },
    {
        channel: "email" as const,
        isAvailable: () => true
    }
)

export const smsSender: Sender = Object.assign(
    async (notification: NotificationPayload): Promise<SendResult> => {
        console.log(notification);
        return {ok: true, messageId: "as189", sentAt: new Date}
    },
    {   
        channel: "sms" as const,
        isAvailable: () => true
    }
)

export const pushSender: Sender = Object.assign(
    async (notification: NotificationPayload): Promise<SendResult> => {
        console.log(notification);
        return {ok: true, messageId: "as139", sentAt: new Date()}
    },
    {
        channel: "push" as const,
        isAvailable: () => true
    }
)

export function logger(data: SendResult): void {
    if (data.ok){
        console.log(`Message: ${data.messageId}, sent at: ${data.sentAt}`)
        return;
    }
    console.log(`Error: ${data.error}, retryable: ${data.retryable}`)
}

export async function sendWithLogging(payload: NotificationPayload, sender: Sender, logger: SendLogger): Promise<void> {
    const sendData = await sender(payload);
    logger(sendData);
}
