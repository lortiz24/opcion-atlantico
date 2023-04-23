import { doc, getDoc, limit, query, setDoc, where } from "firebase/firestore";
import { userInfoCollectionRef } from "../providers";
import { IUserInfo } from "../../interfaces/user-interfaces";

export const getUserInfoById = async (userId: string): Promise<IUserInfo> => {
    try {
        const userInfoRef = doc(userInfoCollectionRef, userId);
        const querySnapshot = await getDoc<Omit<IUserInfo, 'id'>>(userInfoRef);
        console.log(querySnapshot.data())
        return { id: querySnapshot.id, ...querySnapshot.data() } as IUserInfo
    } catch (error) {
        console.log(error)
        return {} as IUserInfo
    }
}


export const createUserInfo = async (userId: string, newUserInfo: Omit<IUserInfo, 'id'>) => {
    try {
        console.log('Creando',userId)
        const userInfoRef = doc(userInfoCollectionRef, userId);
        await setDoc(userInfoRef, newUserInfo);
    } catch (error) {
        console.error("Error al crear el menú: ", error);
        throw error;
    }
}

