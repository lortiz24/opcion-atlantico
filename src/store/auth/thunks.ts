import { loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { checkingCredentials, logout, login } from '.';
import { AppDispatch } from '../store';
import { IStartCreatingUserWithEmailPasswordParams, IStartLoginWithEmailPasswordParams } from '../../interfaces/auth-interface';
import { createUserInfo, getUserInfoById } from '../../firebase/user/user-firebase-services';

export const checkingAuthentication = () => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: IStartCreatingUserWithEmailPasswordParams) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());
        const result = await registerUserWithEmailPassword({ email, password, displayName });
        if (!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result))

    }

}

export const startLoginWithEmailPassword = ({ email, password }: IStartLoginWithEmailPasswordParams) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });
        if (!result.ok && !result.displayName) return dispatch(logout(result));
        const userInfo = await getUserInfoById(result.uid ?? '')

        dispatch(login({ ...result, userInfo }));
    }
}

export const startLogout = () => {
    return async (dispatch: AppDispatch) => {

        await logoutFirebase();
        dispatch(logout({}));

    }
}


