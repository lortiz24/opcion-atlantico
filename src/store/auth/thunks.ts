import { checkingCredentials, logout, login } from '.';
import { AppDispatch } from '../store';
import { IStartCreatingUserWithEmailPasswordParams, IStartLoginWithEmailPasswordParams } from '../../interfaces/auth-interface';
import { userInfoController } from '../../controllers/userInfo/user-info.controller';
import { authController } from '../../controllers/auth/auth.controller';

export const checkingAuthentication = () => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName, promocion }: IStartCreatingUserWithEmailPasswordParams) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());
        const { errorMessage, userCredentials } = await authController.registerUserWithEmailPassword({ email, password, displayName, promocion });
        if (!userCredentials || !userCredentials.uid) return dispatch(logout(errorMessage));

        const userInfo = await userInfoController.createUserInfo(userCredentials.uid, {
            displayName: userCredentials.displayName ?? '',
            email: userCredentials.email ?? '',
            id: userCredentials.uid,
            photoURL: userCredentials.photoURL ?? '',
            rols: ['user'],
            promocion
        })

        dispatch(login({ ...userCredentials, userInfo: userInfo }))

    }

}

export const startLoginWithEmailPassword = ({ email, password }: IStartLoginWithEmailPasswordParams) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

        const { errorMessage, userCredentials } = await authController.loginUserWithEmailPassword({ email, password });
        if (!userCredentials || !userCredentials.uid) return dispatch(logout(errorMessage));
        //todo: revisar ya que si falla te quitara los roles de admin 
        const userInfo = await userInfoController.getOneUserInfo(userCredentials.uid)
        const user = {
            displayName: userCredentials.displayName,
            email: userCredentials.email,
            photoURL: userCredentials.photoURL,
            uid: userCredentials.uid
        }
        dispatch(login({ ...user, userInfo }));
    }
}

export const startLogout = () => {
    return async (dispatch: AppDispatch) => {

        await authController.logout();
        dispatch(logout({}));

    }
}


