import { Timestamp } from 'firebase/firestore';
import { IUserInfo } from './user-interfaces';
import { Dayjs } from 'dayjs';

export interface IEvent {
    id: string;
    img: string;
    typeAttendance: string
    title: string;
    place: string
    desciption: string;
    dateStart: Timestamp
    dateEnd: Timestamp
    assistants: string[]
}

export interface IAssistant {
    id: string;
    name: string
}

export interface IEventsRender {
    href: string;
    title: string;
    avatar: string;
    description: string;
    content: string;
}

export interface IQrCode {
    id: string
    codeQr: string;
}

export type FacingMode = 'user' | 'environment'

export interface IFormEvent extends Omit<IEvent, 'dateStart' | 'dateEnd'> {
    title: string
    assistants: string[];
    place: string;
    desciption: string;
    dateStart: Dayjs
    dateEnd: Dayjs;
    typeAttendance: string
    img: string
}
