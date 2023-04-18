import { addDoc, getDocs } from "firebase/firestore/lite";
import { modulesCollectionRef } from "../providers";
import { IModules } from "../../interfaces/modules-interface";

export const getMenus = async () => {
    const querySnapshot = await getDocs(modulesCollectionRef);
    const modules = querySnapshot.docs.map((doc) => doc.data());
    return modules
}

export const createMenus = async (newMenu: IModules) => {
    try {
        const querySnapshot = await addDoc(modulesCollectionRef, newMenu);
        const newModuleId = querySnapshot.id;
        return newModuleId
    } catch (error) {
        console.error("Error al crear el menú: ", error);
        throw error;
    }
}