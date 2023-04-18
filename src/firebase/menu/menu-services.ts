import { modulesCollectionRef } from "../providers";
import { IModules, StatusMenuItem } from "../../interfaces/modules-interface";
import { query, where, orderBy, limit, addDoc, getDocs, } from "firebase/firestore";
interface IConditionsMenu {
    status?: {
        isAvalible?: StatusMenuItem
    }
}
export const getMenus = async (conditions?: IConditionsMenu) => {
    try {
        let queryData
        queryData = query<Omit<IModules, 'id'>>(modulesCollectionRef, orderBy("order", "asc"));

        const querySnapshot = await getDocs<Omit<IModules, 'id'>>(queryData);
        let modules: IModules[] = []
        querySnapshot.forEach((doc) => {
            const data: Omit<IModules, 'id'> = doc.data();
            modules.push({ id: doc.id, ...data })
        });
        if (conditions?.status?.isAvalible) {
            modules = modules.filter((module) => module.status === conditions?.status?.isAvalible);
        }
        return modules
    } catch (error) {
        console.log(error)
        return []
    }
}

export const createMenus = async (newMenu: Omit<IModules, 'id'>) => {
    try {
        const querySnapshot = await addDoc(modulesCollectionRef, newMenu);
        const newModuleId = querySnapshot.id;
        return newModuleId
    } catch (error) {
        console.error("Error al crear el menú: ", error);
        throw error;
    }
}