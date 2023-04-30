import {
	checkingCredentials,
	logout,
	login,
	updateUserInfo,
	actionUpdate,
} from '.';
import { AppDispatch } from '../store';
import {
	IStartCreatingUserWithEmailPasswordParams,
	IStartLoginWithEmailPasswordParams,
} from '../../interfaces/auth-interface';
import { userInfoController } from '../../controllers/userInfo/user-info.controller';
import { authController } from '../../controllers/auth/auth.controller';
import { IUserInfo } from '../../interfaces/user-interfaces';
import { DispatchMessageService } from '../../components/message-response/DispatchMessageService';

export const checkingAuthentication = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());
	};
};

export const startCreatingUserWithEmailPassword = ({
	email,
	password,
	displayName,
	promocion,
}: IStartCreatingUserWithEmailPasswordParams) => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());
		const { errorMessage, userCredentials } =
			await authController.registerUserWithEmailPassword({
				email,
				password,
				displayName,
				promocion,
			});
		if (!userCredentials || !userCredentials.uid)
			return dispatch(logout(errorMessage));

		const userInfo = await userInfoController.createUserInfo(
			userCredentials.uid,
			{
				displayName: userCredentials.displayName ?? '',
				email: userCredentials.email ?? '',
				id: userCredentials.uid,
				photoURL: userCredentials.photoURL ?? '',
				rols: ['user'],
				promocion,
				address: null,
				city: null,
				dateBirth: null,
				dateCreated: null,
				dateUpdated: null,
				gender: null,
			}
		);

		dispatch(login({ ...userCredentials, userInfo: userInfo }));
	};
};

export const startLoginWithEmailPassword = ({
	email,
	password,
}: IStartLoginWithEmailPasswordParams) => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());

		const { errorMessage, userCredentials } =
			await authController.loginUserWithEmailPassword({ email, password });
		if (!userCredentials || !userCredentials.uid)
			return dispatch(logout(errorMessage));
		//todo: revisar ya que si falla te quitara los roles de admin
		const userInfo = await userInfoController.getOneUserInfo(
			userCredentials.uid
		);
		const user = {
			displayName: userCredentials.displayName,
			email: userCredentials.email,
			photoURL: userCredentials.photoURL,
			uid: userCredentials.uid,
		};
		dispatch(login({ ...user, userInfo }));
	};
};
export const startUpdateUserProfile = (userId: string, userInfo: IUserInfo) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(actionUpdate());
			await userInfoController.updateUserInfo(userId, userInfo);
			await authController.updateProfileUser({ displayName: userInfo.displayName, photoURL: userInfo.photoURL })
			dispatch(updateUserInfo({ userInfo }));
			DispatchMessageService({ action: 'show', type: 'success', msj: 'Se ha actualizado la información de perfil con exito' })
		} catch (error) {
			DispatchMessageService({ action: 'show', type: 'error', msj: 'No se pudo actualizar la informacion, intentelo de nuevo' })
		}

	};
};

export const startLogout = () => {
	return async (dispatch: AppDispatch) => {
		await authController.logout();
		dispatch(logout({}));
	};
};
