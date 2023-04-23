import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { login, logout } from '../store/auth';
import { FirebaseAuth } from '../firebase/ConfigFirebase';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getUserInfoById } from '../firebase/user/user-services';



export const useCheckAuth = () => {

    const { status } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            const userInfo = await getUserInfoById(user?.uid ?? '')
            if (!user || !userInfo.rols) return dispatch(logout({}));

            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL, userInfo }));
        })
    }, []);

    return status;
}
