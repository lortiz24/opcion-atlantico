import { Timestamp } from 'firebase/firestore';

export interface IEvent {
    id: string;
    img: string;
    title: string;
    desciption: string;
    date: Timestamp
    assistants: IAssistant[]
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