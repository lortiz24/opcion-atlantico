


export class ErrorFirebaseService {
    service = ''
    constructor(service: string = 'servicio') {
        this.service = service
    }

    logError(errorMessage: string) {
        console.error(`${this.service} => ${errorMessage}`);
    }

    hanledError(error: any) {
        if (error.code === 'auth/user-not-found') {
            this.logError(`${this.service} => Ocurrio un error, no se encontro el recurso`)
            return 404
        } else if (error.code === 'auth/wrong-password') {
            return 403
        } else {
            return 500
        }
    }
}