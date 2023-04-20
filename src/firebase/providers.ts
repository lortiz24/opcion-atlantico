import { collection, CollectionReference } from "firebase/firestore";
import { FirebaseAuth, FirebaseDB } from "./ConfigFirebase";
import { IModules } from "../interfaces/modules-interface";
import { IQrCode } from "../features/eventModule/interfaces/events-interfaces";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { IRegisterUserWithEmailPasswordParams } from "../interfaces/auth-interface";

export const modulesCollectionRef = collection(FirebaseDB, "modules") as CollectionReference<Omit<IModules, 'id'>>;
export const eventsCollectionRef = collection(FirebaseDB, "events");
export const qrAttendanceCollectionRef = collection(FirebaseDB, "qr-attendance") as CollectionReference<Omit<IQrCode, 'id'>>;

interface ILogin {
    email: string;
    password: string;
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }: IRegisterUserWithEmailPasswordParams) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile(resp.user, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error: any) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }

}


export const loginWithEmailPassword = async ({ email, password }: ILogin) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
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




