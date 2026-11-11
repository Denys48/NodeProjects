export interface User {
    readonly id: number;
    readonly createdAt: Date;
    email: string;
    phone?: string;
    role: "admin" | "user" | "guest";
    preferences: { 
        emailEnabled?: boolean; 
        smsEnabled?: boolean;
    };
}

export interface Admin extends User {
    permissions: ReadonlyArray<string>;
    role: "admin";
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

type WithStringId = { id: string; label: string };
type WithNumberId = { id: number; count: number };

type Broken = WithStringId & WithNumberId;
type SafeMerge = Omit<WithStringId, keyof WithNumberId> & WithNumberId;

// const broken: Broken = {
//     id: 3,
//     label: "some label",
//     count: 444
// }

//The expected type comes from property 'id' which is declared here on type 'Broken'
//    46 type WithStringId = { id: string; label: string };

const notBroken: SafeMerge = {
    id: 3,
    label: "some label",
    count: 444
}


