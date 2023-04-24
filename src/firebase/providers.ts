import { collection, CollectionReference, getFirestore } from "firebase/firestore";
import { FirebaseAuth, FirebaseDB } from "./ConfigFirebase";
import { IModules } from "../interfaces/modules-interface";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updateEmail, updatePassword, deleteUser } from "firebase/auth";
import { IRegisterUserWithEmailPasswordParams } from "../interfaces/auth-interface";
import { IEvent, IQrCode } from "../interfaces/events-interfaces";
import { ILogin } from "../interfaces/firebase-interfaces";
import { IUser, IUserInfo } from "../interfaces/user-interfaces";
import { createUserInfo } from "./user/user-firebase-services";

export const modulesCollectionRef = collection(FirebaseDB, "modules") as CollectionReference<Omit<IModules, 'id'>>;
export const eventsCollectionRef = collection(FirebaseDB, "events") as CollectionReference<Omit<IEvent, 'id'>>;
export const qrAttendanceCollectionRef = collection(FirebaseDB, "qr-attendance") as CollectionReference<Omit<IQrCode, 'id'>>;
export const userInfoCollectionRef = collection(FirebaseDB, "user-info") as CollectionReference<Omit<IUserInfo, 'id'>>;


export const registerUserWithEmailPassword = async ({ email, password, displayName }: IRegisterUserWithEmailPasswordParams) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        await updateProfile(resp.user, { displayName });
        await createUserInfo(uid, { rols: ['user'], displayName, email, photoURL })
        return {
            ok: true,
            uid, photoURL, email, displayName, userInfo: { rols: ['user'] }
        }

    } catch (error: any) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }

}


export const loginWithEmailPassword = async ({ email: emailLogin, password }: ILogin) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, emailLogin, password);
        const { uid, photoURL, displayName, email } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName, email
        }

    } catch (error: any) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();

}

export const updateProfileUser = async (user: Pick<IUser, 'displayName' | 'photoURL'>) => {
    const userToUpdate = FirebaseAuth.currentUser
    if (!userToUpdate) return null
    await updateProfile(userToUpdate, user);
}

export const updateEmailUser = async (newEmail: string) => {
    const userToUpdate = FirebaseAuth.currentUser
    if (!userToUpdate) return null
    await updateEmail(userToUpdate, newEmail);
}

export const updatePasswordUser = async (newPassword: string) => {
    const userToUpdate = FirebaseAuth.currentUser
    if (!userToUpdate) return null
    await updatePassword(userToUpdate, newPassword);
}



