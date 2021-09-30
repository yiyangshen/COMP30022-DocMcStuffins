/* Define the name interface */
export interface IName {
    _id: string;
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
    _id: string;
    created: Date;
    viewed: Date;
    modified?: Date;
}

/* Define the group interface */
export interface IGroup {
    _id: string;
    userId: string;
    name: string;
    members: Array<string>;
}

/* Define the contact */
export interface IContact {
    _id: string;
    userId: string;
    groupId?: IGroup;
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
    _id: string;
    userId: string;
    title: string;
    notes?: string;
    timestamps: ITimestamps;
}
