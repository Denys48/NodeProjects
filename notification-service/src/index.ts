import { User, Admin } from "./domain";
import { NotificationPayload } from "./payload";
import { emailSender, logger, sendWithLogging } from "./senders";
import { handleIncoming } from "./validation";

function handleContext(context: VendorSDK.Context): void {
    console.log(context.requestId);
    if (context.user) {
        console.log(context.user);
    }
}

const admin: Admin = {
    id: 1,
    createdAt: new Date,
    email: "admin@gmail.com",
    phone: "0992301245",
    role: "admin",
    preferences: {
        emailEnabled: true,
        smsEnabled: false
    },
    permissions: ["promote users", "ban users"]
}

const guest: User = {
    id: 2,
    createdAt: new Date,
    email: "guest@gmail.com",
    role: "guest",
    preferences: {}
}

//admin.id = 100;
// Cannot assign to 'id' because it is a read-only property.
//guest.role = "supreme comander";
//Type '"supreme comander"' is not assignable to type '"admin" | "user" | "guest"'.
// admin.phone = 123456789;
//Type 'number' is not assignable to type 'string'.


handleIncoming({ channel: "sms", to: "+380...", text: "hi", priority: "low" });  // валідно
handleIncoming({ channel: "sms", to: "+380...", priority: "low" });              // немає text
handleIncoming({ channel: "carrier-pigeon", text: "hi" });                       // невідомий канал
handleIncoming(null);                                                            // не впасти!
handleIncoming("просто рядок");  

declare global{
    namespace VendorSDK {
        interface Context {
            user?: User;
        }
    }
}

const emailNotification: NotificationPayload = {
    channel: "email",
    to: "test@gmail.com",
    subject: "Hello",
    body: "Test message",
    priority: "high"
};

sendWithLogging(emailNotification, emailSender, logger);