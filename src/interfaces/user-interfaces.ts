import { Timestamp } from 'firebase/firestore';

export type TRoles = 'user' | 'admin' | 'developer' | 'guest';

export interface IUserInfo extends Omit<IUser, 'password'> {
	id: string;
	rols: TRoles[];
	dateBirth: Timestamp | null;
	dateUpdated: Timestamp | null;
	dateCreated: Timestamp | null;
	address: string | null;
	city: string | null;
	promocion: number;
	gender: string | null;
}

export interface IUser {
	email: string;
	displayName: string;
	photoURL: string | null;
	password?: string | null;
}

export interface IUserInfoForm extends Omit<IUserInfo, 'id'> { }
