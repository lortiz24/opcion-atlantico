import { createSlice } from '@reduxjs/toolkit';

type StatusAuth = 'checking' | 'authenticated' | 'not-authenticated';

interface FormModules {
	isLoadingAction: boolean;
	isDrawerOpen: boolean;
	moduleID: string;
	isEdit: boolean;
}

interface IAction {
	payload: Partial<FormModules>,
	type: string
}

const initialState: FormModules = {
	isDrawerOpen: false,
	isEdit: false,
	isLoadingAction: false,
	moduleID: ''
};
export const formModuleSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		startAction: (state) => {
			state.isLoadingAction = true
		},
		stopAction: (state) => {
			state.isLoadingAction = false
		},
		startEdition: (state) => {
			state.isEdit = true
		},
		stopEdition: (state) => {
			state.isEdit = false
		},
		openDrawer: (state) => {
			state.isDrawerOpen = true
		},
		closeDrawer: (state) => {
			state.isDrawerOpen = false
			state.isEdit = false
			state.moduleID = ''
		},
		setModuleID: (state, action: IAction) => {
			switch (action?.type) {
				case 'set':
					if (action?.payload.moduleID) state.moduleID = action.payload.moduleID
					break;
				case 'delete':
					state.moduleID = ''
					break;
			}
		},
		openEditionMode: (state, action: IAction) => {
			if (action?.payload.moduleID) state.moduleID = action.payload.moduleID
			state.isEdit = true
			state.isDrawerOpen = true

		},
		closeEditionMode: (state) => {
			state.moduleID = ''
			state.isEdit = false
			state.isDrawerOpen = false
		},
		restoreState: (state) => {
			state.isDrawerOpen = false
			state.isEdit = false
			state.isLoadingAction = false
			state.moduleID = ''
		}
	},
});

// Action creators are generated for each case reducer function
export const { closeDrawer, openDrawer, startAction, startEdition, stopAction, stopEdition, closeEditionMode, openEditionMode, setModuleID, restoreState } = formModuleSlice.actions;
