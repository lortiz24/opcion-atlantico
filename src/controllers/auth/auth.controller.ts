import { AuthFirebaseService } from "../../firebase/auth/auth-firebase.service";
import { IRegisterUserWithEmailPasswordParams } from "../../interfaces/auth-interface";
import { ILogin } from "../../interfaces/firebase-interfaces";

export class AuthController {
    constructor(
        private readonly authService = new AuthFirebaseService()
    ) { }

    async registerUserWithEmailPassword(infoUser: IRegisterUserWithEmailPasswordParams) {
        const userCredentials = await this.authService.registerUserWithEmailPassword(infoUser)
        return userCredentials
    }
    async loginUserWithEmailPassword(loginUserCredentials: ILogin) {
        const userCredentials = await this.authService.loginWithEmailPassword(loginUserCredentials)
        return userCredentials
    }
    async updateProfileUser({ displayName, photoURL }: {
        displayName?: string | null;
        photoURL?: string | null;
    }) {
        const userCredentials = await this.authService.updateProfileUser({ displayName, photoURL })
        return userCredentials
    }
    async logout() {
        await this.authService.logoutSession()
    }
}

export const authController = new AuthController()