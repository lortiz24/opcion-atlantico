import * as FirebaseAuthService from "firebase/auth";
import { IRegisterUserWithEmailPasswordParams } from "../../interfaces/auth-interface";
import { FirebaseAuth } from "../ConfigFirebase";
import { ILogin } from "../../interfaces/firebase-interfaces";
import { IUser } from "../../interfaces/user-interfaces";

export class AuthFirebaseService {
    constructor(
        private firebaseAuth = FirebaseAuth,
        private readonly firebaseAuthService = FirebaseAuthService
    ) { }

    async registerUserWithEmailPassword({ email, password, displayName }: IRegisterUserWithEmailPasswordParams) {
        try {
            const resp = await this.firebaseAuthService.createUserWithEmailAndPassword(this.firebaseAuth, email, password);
            await this.firebaseAuthService.updateProfile(resp.user, { displayName });
            return { userCredentials: resp.user }
        } catch (error: any) {
            console.log(error);
            return { errorMessage: error.message }
        }

    }

    async loginWithEmailPassword({ email: emailLogin, password }: ILogin) {

        try {
            const resp = await this.firebaseAuthService.signInWithEmailAndPassword(FirebaseAuth, emailLogin, password);

            return { userCredentials: resp.user }

        } catch (error: any) {
            return { errorMessage: error.message }
        }
    }

    async logoutSession() {
        return await this.firebaseAuth.signOut();
    }

    async updateProfileUser(user: Pick<IUser, 'displayName' | 'photoURL'>) {
        const userToUpdate = FirebaseAuth.currentUser
        if (!userToUpdate) return null
        await this.firebaseAuthService.updateProfile(userToUpdate, user);
    }

    async updateEmailUser(newEmail: string) {
        const userToUpdate = FirebaseAuth.currentUser
        if (!userToUpdate) return null
        await this.firebaseAuthService.updateEmail(userToUpdate, newEmail);
    }

    async updatePasswordUser(newPassword: string) {
        const userToUpdate = FirebaseAuth.currentUser
        if (!userToUpdate) return null
        await this.firebaseAuthService.updatePassword(userToUpdate, newPassword);
    }
}

export const authFirebaseService = new AuthFirebaseService()

