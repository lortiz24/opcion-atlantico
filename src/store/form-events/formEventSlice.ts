import { createSlice } from '@reduxjs/toolkit';
import { IEvent } from '../../interfaces/events-interfaces';

type StatusAuth = 'checking' | 'authenticated' | 'not-authenticated';

interface FormEvents {
	isLoadingFormEvent: boolean;
	isDrawerEventOpen: boolean;
	eventId: string;
	isEditFormEvent: boolean;
}

interface IAction {
	payload: Partial<FormEvents>,
	type: string
}

const initialState: FormEvents = {
	isDrawerEventOpen: false,
	isEditFormEvent: false,
	eventId: '',
	isLoadingFormEvent: false
};
export const formEventSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		startActionEvent: (state) => {
			state.isLoadingFormEvent = true
		},
		stopActionEvent: (state) => {
			state.isLoadingFormEvent = false
		},
		startEditionEvent: (state) => {
			state.isEditFormEvent = true
		},
		stopEditionEvent: (state) => {
			state.isEditFormEvent = false
		},
		openDrawerFormEvent: (state) => {
			state.isDrawerEventOpen = true
		},
		closeDrawerEvent: (state) => {
			state.isDrawerEventOpen = false
			state.isEditFormEvent = false
			state.eventId = ''
			state.isLoadingFormEvent = false
		},

		openEditionModeEvent: (state, action: IAction) => {
			if (action?.payload.eventId) {
				state.eventId = action.payload.eventId
				state.isEditFormEvent = true
				state.isDrawerEventOpen = true
			}

		},
		restoreStateEvent: (state) => {
			state.isDrawerEventOpen = false
			state.isEditFormEvent = false
			state.isLoadingFormEvent = false
			state.eventId = ''
		}
	},
});

// Action creators are generated for each case reducer function
export const { closeDrawerEvent, openDrawerFormEvent, openEditionModeEvent, restoreStateEvent, startActionEvent, startEditionEvent, stopActionEvent, stopEditionEvent } = formEventSlice.actions;
