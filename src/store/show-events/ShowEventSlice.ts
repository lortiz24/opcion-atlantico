import { createSlice } from '@reduxjs/toolkit';
import { IEvent } from '../../interfaces/events-interfaces';

type StatusAuth = 'checking' | 'authenticated' | 'not-authenticated';

interface IShowEvents {
    event: Omit<IEvent, 'dateStart' | 'dateEnd'> | undefined
    eventId: string,
    isGenerateQrOpen: boolean,
    isCheckinManualOpen: boolean
    typeView: 'gestion' | 'event-all' | 'initial',
    isViewAttendence: boolean,
}


const initialState: IShowEvents = {
    isGenerateQrOpen: false,
    isCheckinManualOpen: false,
    eventId: '',
    typeView: 'initial',
    event: undefined,
    isViewAttendence: false,
};

interface IOnSetAction {
    payload: {
        eventId: string
        typeView: 'gestion' | 'event-all' | 'initial'
        event: Omit<IEvent, 'dateStart' | 'dateEnd'> | undefined
    }
}


export const showEventSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChekingOpen: (status, action: IOnSetAction) => {
            status.isCheckinManualOpen = true
            status.eventId = action.payload.eventId
            status.typeView = action.payload.typeView
            status.event = action.payload.event
        },
        onCancelCheking: (status) => {
            status.isCheckinManualOpen = false
            status.eventId = ''
        },
        onGenerateQr: (status, { payload }: IOnSetAction) => {
            status.isGenerateQrOpen = true
            status.eventId = payload.eventId
            status.typeView = payload.typeView
        },
        onCancelGenerateQr: (status) => {
            status.isGenerateQrOpen = false
            status.eventId = ''
        },
        onViewAttendance: (status, { payload }: IOnSetAction) => {
            status.eventId = payload.eventId
            status.isViewAttendence = true
        },

        onCancelViewAttendance: (status) => {
            status.isViewAttendence = false
            status.eventId = ''
        },
    },
});

export const { onCancelCheking, onCancelGenerateQr, onChekingOpen, onGenerateQr, onCancelViewAttendance, onViewAttendance } = showEventSlice.actions;
