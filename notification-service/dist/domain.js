"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
// const broken: Broken = {
//     id: 3,
//     label: "some label",
//     count: 444
// }
//The expected type comes from property 'id' which is declared here on type 'Broken'
//    46 type WithStringId = { id: string; label: string };
const notBroken = {
    id: 3,
    label: "some label",
    count: 444
};
