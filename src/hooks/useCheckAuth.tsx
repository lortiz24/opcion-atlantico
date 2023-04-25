import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth';
import { FirebaseAuth } from '../firebase/ConfigFirebase';
import { useAppDispatch, useAppSelector } from '../store/store';
import { userInfoController } from '../controllers/userInfo/user-info.controller';



export const useCheckAuth = () => {

    const { status } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            console.log('user',user)
            const userInfo = await userInfoController.getOneUserInfo(user?.uid ?? '')
            console.log('userInfo',userInfo)
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
            console.log('displayName',displayName)
            dispatch(login({ uid, email, displayName, photoURL, userInfo }));
        })
    }, []);

    return status;
}
