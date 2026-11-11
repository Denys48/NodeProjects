"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const senders_1 = require("./senders");
const validation_1 = require("./validation");
function handleContext(context) {
    console.log(context.requestId);
    if (context.user) {
        console.log(context.user);
    }
}
const admin = {
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
};
const guest = {
    id: 2,
    createdAt: new Date,
    email: "guest@gmail.com",
    role: "guest",
    preferences: {}
};
//admin.id = 100;
// Cannot assign to 'id' because it is a read-only property.
//guest.role = "supreme comander";
//Type '"supreme comander"' is not assignable to type '"admin" | "user" | "guest"'.
// admin.phone = 123456789;
//Type 'number' is not assignable to type 'string'.
(0, validation_1.handleIncoming)({ channel: "sms", to: "+380...", text: "hi", priority: "low" }); // валідно
(0, validation_1.handleIncoming)({ channel: "sms", to: "+380...", priority: "low" }); // немає text
(0, validation_1.handleIncoming)({ channel: "carrier-pigeon", text: "hi" }); // невідомий канал
(0, validation_1.handleIncoming)(null); // не впасти!
(0, validation_1.handleIncoming)("просто рядок");
const emailNotification = {
    channel: "email",
    to: "test@gmail.com",
    subject: "Hello",
    body: "Test message",
    priority: "high"
};
(0, senders_1.sendWithLogging)(emailNotification, senders_1.emailSender, senders_1.logger);
