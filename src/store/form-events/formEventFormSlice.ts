import { createSlice } from '@reduxjs/toolkit';

type StatusAuth = 'checking' | 'authenticated' | 'not-authenticated';

interface FormEvents {
	isLoadingFormEvent: boolean;
	isDrawerOpen: boolean;
	eventId: string;
	isEditFormEvent: boolean;
}

interface IAction {
	payload: Partial<FormEvents>,
	type: string
}

const initialState: FormEvents = {
	isDrawerOpen: false,
	isEditFormEvent: false,
	eventId: '',
	isLoadingFormEvent: false
};
export const formModuleSlice = createSlice({
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
			state.isDrawerOpen = true
		},
		closeDrawer: (state) => {
			state.isDrawerOpen = false
			state.isEditFormEvent = false
			state.eventId = ''
		},

		openEditionMode: (state, action: IAction) => {
			if (action?.payload.eventId) state.eventId = action.payload.eventId
			state.isEditFormEvent = true
			state.isDrawerOpen = true

		},
		restoreState: (state) => {
			state.isDrawerOpen = false
			state.isEditFormEvent = false
			state.isLoadingFormEvent = false
			state.eventId = ''
		}
	},
});

// Action creators are generated for each case reducer function
export const { closeDrawer, openDrawerFormEvent, startAction, startEdition, stopAction, stopEdition, openEditionMode, restoreState } = formModuleSlice.actions;
