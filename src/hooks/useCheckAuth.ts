import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { login, logout } from '../store/auth';
import { FirebaseAuth } from '../firebase/ConfigFirebase';
import { useAppDispatch, useAppSelector } from '../store/store';



export const useCheckAuth = () => {

    const { status } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout({}));

            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
        })
    }, []);

    return status;
}
