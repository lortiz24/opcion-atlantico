
export interface IStartCreatingUserWithEmailPasswordParams {
    email: string;
    password: string;
    displayName: string;
}

export interface IStartLoginWithEmailPasswordParams extends Omit<IStartCreatingUserWithEmailPasswordParams, 'displayName'> { }

export interface IRegisterUserWithEmailPasswordParams extends IStartCreatingUserWithEmailPasswordParams { }