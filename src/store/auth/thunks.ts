import { loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { checkingCredentials, logout, login } from '.';
import { AppDispatch } from '../store';
import { IStartCreatingUserWithEmailPasswordParams, IStartLoginWithEmailPasswordParams } from '../../interfaces/auth-interface';

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
        console.log(result);

        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result));

    }
}

export const startLogout = () => {
    return async (dispatch: AppDispatch) => {

        await logoutFirebase();
        dispatch(logout({}));

    }
}

