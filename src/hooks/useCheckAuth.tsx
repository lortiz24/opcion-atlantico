import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth';
import { FirebaseAuth } from '../firebase/ConfigFirebase';
import { useAppDispatch, useAppSelector } from '../store/store';
import { userInfoController } from '../controllers/userInfo/UserInfoController';



export const useCheckAuth = () => {

    const { status } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            const userInfo = await userInfoController.getOneUserInfo(user?.uid ?? '')
            if (!user) return dispatch(logout({}));
            if (!userInfo || !userInfo.rols) {
                userInfoController.createUserInfo(user?.uid ?? '', {
                    displayName: user.displayName ?? '',
                    email: user.email ?? '',
                    id: user.uid,
                    photoURL: user.photoURL,
                    rols: ['user']
                })
            }
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL, userInfo }));
        })
    }, []);

    return status;
}