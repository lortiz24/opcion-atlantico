import { Timestamp } from "firebase/firestore";

export type TRoles = 'user' | 'admin' | 'developer' | 'guest'

export interface IUserInfo extends Omit<IUser,'password'> {
    id: string;
    rols: TRoles[];
    dateBirth?: Timestamp;
    dateUpdated?: Timestamp;
    dateCreated?: Timestamp;
}

export interface IUser {
    email: string;
    displayName: string;
    photoURL: string | null;
    password: string;
}