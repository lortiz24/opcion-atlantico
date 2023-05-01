import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth';
import { FirebaseAuth } from '../firebase/ConfigFirebase';
import { useAppDispatch, useAppSelector } from '../store/store';
import { userInfoController } from '../controllers/userInfo/user-info.controller';
import useGetStatusConection from './useGetStatusConection';
import { DispatchMessageService } from '../components/message-response/DispatchMessageService';



export const useCheckAuth = () => {

    const { status } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const { statusConection } = useGetStatusConection()
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if(statusConection==='not-conection')return DispatchMessageService({action:'show',type:'error',msj:'Se perfio la conexion a internet'})
            //todo: si no tiene info usuario o no alcanza a encontrarlo, no realizar el login
            if (!user) return dispatch(logout({}));
            const userInfo = await userInfoController.getOneUserInfo(user?.uid ?? '')
            if (!userInfo || !userInfo.rols) {
                return dispatch(logout({ errorMessage: 'Su usuario no tiene configurado correctamente su informacion, consulte con el administrador o intentelo de nuevo' }));
                /* userInfoController.createUserInfo(user?.uid ?? '', {
                    displayName: user.displayName ?? '',
                    email: user.email ?? '',
                    id: user.uid,
                    photoURL: user.photoURL,
                    rols: ['user']
                }) */
            }
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL, userInfo }));
        })
    }, []);

    return status;
}
