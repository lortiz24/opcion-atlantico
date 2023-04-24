import { createSlice } from '@reduxjs/toolkit';

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
		startAction: (state) => {
			state.isLoadingFormEvent = true
		},
		stopAction: (state) => {
			state.isLoadingFormEvent = false
		},
		startEdition: (state) => {
			state.isEditFormEvent = true
		},
		stopEdition: (state) => {
			state.isEditFormEvent = false
		},
		openDrawerFormEvent: (state) => {
			state.isDrawerEventOpen = true
		},
		closeDrawerEvent: (state) => {
			state.isDrawerEventOpen = false
			state.isEditFormEvent = false
			state.eventId = ''
		},

		openEditionMode: (state, action: IAction) => {
			if (action?.payload.eventId) state.eventId = action.payload.eventId
			state.isEditFormEvent = true
			state.isDrawerEventOpen = true

		},
		restoreState: (state) => {
			state.isDrawerEventOpen = false
			state.isEditFormEvent = false
			state.isLoadingFormEvent = false
			state.eventId = ''
		}
	},
});

// Action creators are generated for each case reducer function
export const { closeDrawerEvent, openDrawerFormEvent, startAction, startEdition, stopAction, stopEdition, openEditionMode, restoreState } = formEventSlice.actions;
