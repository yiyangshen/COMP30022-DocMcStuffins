/* Define the name interface */
export interface IName {
    first: string;
    middle?: string;
    last: string;
}

/* Define the user interface */
export interface IUser {
    _id: string;
    email: string;
    name: IName;
    password: string;
}

/* Define the timestamps */
export interface ITimestamps {
    created: Date;
    viewed: Date;
    modified?: Date;
}

/* Define the group interface */
export interface IGroup {
    userId: string;
    name: string;
    members: Array<string>;
}

/* Define the contact */
export interface IContact {
    userId: string;
    groupId?: string;
    name: IName;
    gender: string;
    dateOfBirth?: Date;
    lastMet?: Date;
    phoneNumber?: string;
    email?: string;
    photo?: string;
    relationship?: string;
    additionalNotes?: string;
    timestamps: ITimestamps;
}

/* Define the memo interface */
export interface IMemo {
    userId: string;
    title: string;
    notes?: string;
    timestamps: ITimestamps;
}
