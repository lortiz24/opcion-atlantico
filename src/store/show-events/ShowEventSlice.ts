import { createSlice } from '@reduxjs/toolkit';
import { IEvent } from '../../interfaces/events-interfaces';

type StatusAuth = 'checking' | 'authenticated' | 'not-authenticated';

interface IShowEvents {
    eventId: string,
    isGenerateQrOpen: boolean,
    isCheckinManualOpen: boolean
    typeView: 'gestion' | 'event-all' | 'initial'
}


const initialState: IShowEvents = {
    isGenerateQrOpen: false,
    isCheckinManualOpen: false,
    eventId: '',
    typeView: 'initial'
};

interface IOnSetAction {
    payload: {
        eventId: string
        typeView: 'gestion' | 'event-all' | 'initial'
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
    },
});

export const { onCancelCheking, onCancelGenerateQr, onChekingOpen, onGenerateQr } = showEventSlice.actions;
