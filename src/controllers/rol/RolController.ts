import { RolFirebaseService } from "../../firebase/rols/RolServices";

export class RolController {
    constructor(
        private userInfoService = new RolFirebaseService()
    ) { }

    async getAll() {
        const rols = await this.userInfoService.getRols()
        return rols
    }
    async getOneById(rolId: string) {
        const rols = await this.userInfoService.getRolById(rolId)
        return rols
    }
}

export const rolController = new RolController();