import { Timestamp } from 'firebase/firestore';
import { Dayjs } from 'dayjs';
import { UploadFile } from 'antd';

export interface IEvent {
    id: string;
    title: string;
    place: string //parametrizable
    desciption: string;
    dateStart: Timestamp
    dateEnd: Timestamp
    assistants: string[] //array de ids de user
    moderators: string[] //array de ids de user
    typeAttendance: 'manual' | 'automatic'
    typeEvent: 'face-to-face' | 'virtual'
    urlMeet?: string
    img: string | undefined;
    anfitrion: string;
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
    imgForm: UploadFile<any>[]
}
