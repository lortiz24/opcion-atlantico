import { doc, getDoc, getDocs, query } from "firebase/firestore";
import { IRol } from "../../interfaces/rols-interfaces";
import { rolsCollectionRef } from "../providers";

export class RolFirebaseService {
    constructor(
        private rolCollection = rolsCollectionRef
    ) { }

    async getRols() {
        try {
            const usersInfo: IRol[] = []
            let queryData = query<Omit<IRol, 'id'>>(this.rolCollection);
            const querySnapshot = await getDocs<Omit<IRol, 'id'>>(queryData);
            querySnapshot.forEach((doc) => {
                const data: Omit<IRol, 'id'> = doc.data();
                usersInfo.push({ id: doc.id, ...data })
            });

            return usersInfo;
        } catch (error) {
            console.log(error)
        }
    }
    async getRolById(rolId: string) {
        try {
            const rolRef = doc(this.rolCollection, rolId);

            const querySnapshot = await getDoc<Omit<IRol, 'id'>>(rolRef);
            console.log('querySnapshot',querySnapshot)
            return { id: querySnapshot.id, ...querySnapshot.data() } as IRol

        } catch (error) {
            console.log(error)
        }
    }
}

export const rolFirebaseService = new RolFirebaseService()