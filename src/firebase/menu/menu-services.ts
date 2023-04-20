import { modulesCollectionRef } from "../providers";
import { IModules, StatusMenuItem } from "../../interfaces/modules-interface";
import { query, where, orderBy, limit, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, } from "firebase/firestore";
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
export const deleteMenu = async (idMenu: string) => {
    try {
        const moduleRef = doc(modulesCollectionRef, idMenu);
        await deleteDoc(moduleRef);
    } catch (error) {
        console.error("Error al eliminar el menú: ", error);
        throw error;
    }
}
export const updateMenu = async (idMenu: string, { id, ...newMenu }: IModules) => {
    try {
        const moduleRef = doc(modulesCollectionRef, idMenu);
        console.log('newMenu', idMenu)
        await updateDoc(moduleRef, newMenu);
    } catch (error) {
        console.error("Error al actualizar el menú: ", error);
        throw error;
    }
}
export const inactiveMenu = async (idMenu: string) => {
    try {
        const moduleRef = doc(modulesCollectionRef, idMenu);

        await updateDoc(moduleRef, { status: "not-avalible" });
    } catch (error) {
        console.error("Error al inactivar el menú: ", error);
        throw error;
    }
}
export const activeMenu = async (idMenu: string) => {
    try {
        const moduleRef = doc(modulesCollectionRef, idMenu);
        await updateDoc(moduleRef, { status: "avalible" });
    } catch (error) {
        console.error("Error activar el menú: ", error);
        throw error;
    }
}
export const listeningModules = (onSet: (modules: IModules[]) => void) => {
    const queryData = query<Omit<IModules, 'id'>>(modulesCollectionRef, orderBy("order", "asc"));
    return onSnapshot(queryData, (querySnapshot) => {
        if (!querySnapshot.empty) {
            const modules: IModules[] = []
            querySnapshot.forEach((doc) => modules.push({ id: doc.id, ...doc.data() }));
            onSet(modules)
        } else {
            onSet([])
        }
    });
}

export const listeningModule = (moduleId: string, onSet: (modules: IModules) => void) => {
    console.log("🚀 ~ file: menu-services.ts:83 ~ listeningModule ~ moduleId:", moduleId)
    const moduleRef = doc(modulesCollectionRef, moduleId);
    return onSnapshot(moduleRef, (doc) => {
        const data = doc.data()
        onSet({ id: doc.id, ...data } as IModules)
    });
}