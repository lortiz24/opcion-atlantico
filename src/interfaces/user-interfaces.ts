import { Timestamp } from "firebase/firestore";

export type TRoles = 'user' | 'admin' | 'developer' | 'guest'

export interface IUserInfo {
    id: string;
    rols: TRoles[];
    dateBirth?: Timestamp;
    dateUpdated?: Timestamp;
    dateCreated?: Timestamp;
}

export interface IUser {
    email: string;
    displayName: string;
    photoUrl: string;
    password: string;
}