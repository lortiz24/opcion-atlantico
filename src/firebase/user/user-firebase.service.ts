import { deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { userInfoCollectionRef } from "../providers";
import { IUserInfo } from "../../interfaces/user-interfaces";


export class UserServiceFirebase {

    constructor(private userInfoCollection = userInfoCollectionRef) { }

    async createUserInfo(userId: string, newUserInfo: IUserInfo) {
        try {
            const userInfoRef = doc(this.userInfoCollection, userId);
            await setDoc(userInfoRef, newUserInfo);

            const userInfo = await this.getUserInfo(userId)
            return userInfo
        } catch (error) {
            console.log(error)
        }
    }

    async getUsersInfo() {
        try {
            const usersInfo: IUserInfo[] = []
            let queryData = query<Omit<IUserInfo, 'id'>>(this.userInfoCollection);
            const querySnapshot = await getDocs<Omit<IUserInfo, 'id'>>(queryData);
            querySnapshot.forEach((doc) => {
                const data: Omit<IUserInfo, 'id'> = doc.data();
                usersInfo.push({ id: doc.id, ...data })
            });

            return usersInfo;
        } catch (error) {
            console.log(error)
        }
    }
    async getUserInfo(userInfoId: string) {
        try {
            const moduleRef = doc(this.userInfoCollection, userInfoId);

            const querySnapshot = await getDoc<Omit<IUserInfo, 'id'>>(moduleRef);

            return { id: querySnapshot.id, ...querySnapshot.data() } as IUserInfo
        } catch (error) {
            console.log(error)
        }
    }

    async updateUserInfo(userInfoId: string, { id, ...newUserInfo }: IUserInfo) {
        try {
            const userInfoRef = doc(this.userInfoCollection, userInfoId);
            await updateDoc(userInfoRef, newUserInfo);
            return { ok: true }
        } catch (error) {
            return { ok: false }
        }
    }

    async deleteUserInfo(userInfoId: string) {
        try {
            const userInfoRef = doc(this.userInfoCollection, userInfoId);
            await deleteDoc(userInfoRef);
            return { ok: true }
        } catch (error) {
            return { ok: false }
        }
    }
}

export const useServiceFirebase = new UserServiceFirebase()

