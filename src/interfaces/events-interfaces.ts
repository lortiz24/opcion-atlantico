import { Timestamp, WhereFilterOp } from 'firebase/firestore';
import { Dayjs } from 'dayjs';
import { UploadFile } from 'antd';
import { IUserInfo } from './user-interfaces';

export interface IEvent {
    id: string;
    title: string;
    place: string //parametrizable
    desciption: string;
    dateStart: Timestamp
    dateEnd: Timestamp
    assistants: string[] //array de ids de user
    moderators: string[] //array de ids de user
    typeAttendance: 'invitation' | 'free' | 'hybrid'
    typeEvent: 'face-to-face' | 'virtual' | 'hybrid'
    urlMeet?: string
    img?: IImageEvent | undefined | null;
    anfitrion: string;
    forengData?: IForenData
}
export interface IImageEvent { url: string, name: string }
interface IForenData {
    moderators?: IUserInfo[];
    assistants?: IUserInfo[];
}

export interface ISelectedForeign {
    moderators?: boolean
    assistants?: boolean
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
    token: string;
    eventId: string
}

export type FacingMode = 'user' | 'environment'

export interface IFormEvent extends Omit<IEvent, 'dateStart' | 'dateEnd'> {
    title: string
    assistants: string[];
    place: string;
    desciption: string;
    dateStart: Dayjs
    timeStart: Dayjs
    dateEnd: Dayjs
    timeEnd: Dayjs
    imgForm: UploadFile<any>[]
}

export interface IWhereQuerys {
    nameProperty: string
    value: string,
    operation: WhereFilterOp
}

export interface IAttendanceByEvent {
    id: string;
    userId: string
}