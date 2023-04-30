import { createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from '../../interfaces/user-interfaces';

type StatusAuth = 'checking' | 'authenticated' | 'not-authenticated';

interface AuthState {
	status: StatusAuth;
	uid: string | null;
	email?: string | null;
	displayName: string | null;
	photoURL: string | null;
	errorMessage?: any;
	userInfo?: IUserInfo;
	isUpdateProfile: boolean;
}

interface Payload extends Partial<Omit<AuthState, 'status'>> {}

const initialState: AuthState = {
	status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
	isUpdateProfile: false,
};
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, { payload }: { payload: Payload }) => {
			state.status = 'authenticated';
			state.uid = payload.uid ?? '';
			state.email = payload.email;
			state.displayName = payload.displayName ?? '';
			state.photoURL = payload.photoURL ?? '';
			state.errorMessage = null;
			state.userInfo = payload.userInfo;
		},
		logout: (state, { payload }) => {
			state.status = 'not-authenticated';
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.photoURL = null;
			state.errorMessage = payload?.errorMessage;
		},
		actionUpdate: (state) => {
			state.isUpdateProfile = true;
		},

		updateUserInfo: (state, { payload }) => {
			state.isUpdateProfile = false;
			state.userInfo = payload.userInfo;
		},
		checkingCredentials: state => {
			state.status = 'checking';
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	login,
	logout,
	checkingCredentials,
	updateUserInfo,
	actionUpdate,
} = authSlice.actions;
