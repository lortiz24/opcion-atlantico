import { loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { checkingCredentials, logout, login } from '.';
import { AppDispatch } from '../store';
import { IStartCreatingUserWithEmailPasswordParams, IStartLoginWithEmailPasswordParams } from '../../interfaces/auth-interface';
import { userInfoController } from '../../controllers/userInfo/UserInfoController';

export const checkingAuthentication = () => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: IStartCreatingUserWithEmailPasswordParams) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());
        const result = await registerUserWithEmailPassword({ email, password, displayName });
        if (!result.ok || !result.uid) return dispatch(logout(result.errorMessage));

        const userInfo = await userInfoController.createUserInfo(result.uid, {
            displayName: result.displayName ?? '',
            email: result.email ?? '',
            id: result.uid,
            photoURL: result.photoURL ?? '',
            rols: ['user'],

        })
        const { ok, ...restUser } = result
        dispatch(login({ ...restUser, userInfo: userInfo }))

    }

}

export const startLoginWithEmailPassword = ({ email, password }: IStartLoginWithEmailPasswordParams) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });
        if (!result.ok) return dispatch(logout(result));

        const userInfo = await userInfoController.getOneUserInfo(result.uid ?? '')
        const { ok, ...restUser } = result
        dispatch(login({ ...restUser, userInfo }));
    }
}

export const startLogout = () => {
    return async (dispatch: AppDispatch) => {

        await logoutFirebase();
        dispatch(logout({}));

    }
}


