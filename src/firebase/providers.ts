import { collection, CollectionReference } from "firebase/firestore";
import { FirebaseAuth, FirebaseDB } from "./ConfigFirebase";
import { IModules } from "../interfaces/modules-interface";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { IRegisterUserWithEmailPasswordParams } from "../interfaces/auth-interface";
import { IQrCode } from "../interfaces/events-interfaces";
import { ILogin } from "../interfaces/firebase-interfaces";
import { IUserInfo } from "../interfaces/user-interfaces";
import { createUserInfo } from "./user/user-services";

export const modulesCollectionRef = collection(FirebaseDB, "modules") as CollectionReference<Omit<IModules, 'id'>>;
export const eventsCollectionRef = collection(FirebaseDB, "events");
export const qrAttendanceCollectionRef = collection(FirebaseDB, "qr-attendance") as CollectionReference<Omit<IQrCode, 'id'>>;
export const userInfoCollectionRef = collection(FirebaseDB, "user-info") as CollectionReference<Omit<IUserInfo, 'id'>>;


export const registerUserWithEmailPassword = async ({ email, password, displayName }: IRegisterUserWithEmailPasswordParams) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile(resp.user, { displayName });
        await createUserInfo(uid, { rols: ['user'] })
        return {
            ok: true,
            uid, photoURL, email, displayName, userInfo: { rols: ['user'] }
        }

    } catch (error: any) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }

}


export const loginWithEmailPassword = async ({ email, password }: ILogin) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        console.log('resp', resp)
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error: any) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();

}




