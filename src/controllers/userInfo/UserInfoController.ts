import { UserServiceFirebase } from "../../firebase/user/user-firebase-services";
import { IUserInfo } from "../../interfaces/user-interfaces";

interface IResult {
    ok: boolean
}

export class UserInfoController {
    constructor(
        private userInfoService = new UserServiceFirebase()
    ) { }

    async getUsersInfos() {
        const usersInfo = this.userInfoService.getUsersInfo()
        return usersInfo
    }
    async getOneUserInfo(userInfoId: string): Promise<IUserInfo | undefined> {
        const usersInfo = await this.userInfoService.getUserInfo(userInfoId)
        return usersInfo
    }
    async createUserInfo(userId: string, newUserInfo: IUserInfo): Promise<IUserInfo | undefined> {
        const res = await this.userInfoService.createUserInfo(userId, newUserInfo)
        return res
    }

    async updateUserInfo(userId: string, newUserInfo: IUserInfo): Promise<{ ok: boolean }> {
        const usersInfo = this.userInfoService.updateUserInfo(userId, newUserInfo)
        return usersInfo
    }

}

export const userInfoController = new UserInfoController()