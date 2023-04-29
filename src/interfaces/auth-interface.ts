
export interface IStartCreatingUserWithEmailPasswordParams {
    email: string;
    password: string;
    displayName: string;
    promocion: string;
}

export interface IStartLoginWithEmailPasswordParams extends Omit<IStartCreatingUserWithEmailPasswordParams, 'displayName' | 'promocion'> { }

export interface IRegisterUserWithEmailPasswordParams extends IStartCreatingUserWithEmailPasswordParams { }