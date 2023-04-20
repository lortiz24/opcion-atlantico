import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TStatusConection } from '../../interfaces/status-conection.interface';

interface MenuState {
	statusConection: TStatusConection;
}
const initialState: MenuState = {
	statusConection: 'initial',
};

export const statusConectionSlice = createSlice({
	name: 'statusConection',
	initialState,
	reducers: {
		setStatusConection: (state, action) => {
			state.statusConection = action.payload.statusConection;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setStatusConection } = statusConectionSlice.actions;

export const selectMenus = (state: RootState) => state.menu;
