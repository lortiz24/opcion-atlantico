import { modulesCollectionRef } from "../providers";
import { IConditionGetMenus, IMenu } from "../../interfaces/modules-interface";
import { query, orderBy, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, getDoc, where, } from "firebase/firestore";

export class MenuFirebaseService {
    constructor(
        private modulesCollection = modulesCollectionRef,
    ) { }

    async getMenusToSlice() {
        try {
            let queryData
            queryData = query<Omit<IMenu, 'id'>>(this.modulesCollection, orderBy("order", "asc"));
            const querySnapshot = await getDocs<Omit<IMenu, 'id'>>(queryData);
            let modules: IMenu[] = []
            querySnapshot.forEach((doc) => {
                const data: Omit<IMenu, 'id'> = doc.data();
                const childrens = data.children.filter((child) => child.status === "avalible")
                modules.push({ id: doc.id, ...data, children: childrens })
            });

            return modules
        } catch (error) {
            console.log(error)
            return []
        }
    }
    async getMenusWithConditions(conditions?: IConditionGetMenus) {
        try {
            let queryData = query<Omit<IMenu, 'id'>>(this.modulesCollection, orderBy("order", "asc"));
            if (conditions?.rols) {
                queryData = query<Omit<IMenu, 'id'>>(this.modulesCollection, orderBy("order", "asc"), where('rolAcces', 'array-contains-any', conditions.rols));
            }
            const querySnapshot = await getDocs<Omit<IMenu, 'id'>>(queryData);
            let modules: IMenu[] = []
            querySnapshot.forEach((doc) => {
                const data: Omit<IMenu, 'id'> = doc.data();
                const childrens = data.children.filter((child) => child.status === "avalible")
                modules.push({ id: doc.id, ...data, children: childrens })
            });

            return modules
        } catch (error) {
            console.log(error)
            return []
        }
    }


    async getMenus() {
        try {
            let queryData
            queryData = query<Omit<IMenu, 'id'>>(this.modulesCollection, orderBy("order", "asc"));

            const querySnapshot = await getDocs<Omit<IMenu, 'id'>>(queryData);
            let modules: IMenu[] = []
            querySnapshot.forEach((doc) => {
                const data: Omit<IMenu, 'id'> = doc.data();
                modules.push({ id: doc.id, ...data })
            });

            return modules
        } catch (error) {
            console.log(error)
        }
    }

    async getModule(menuId: string) {
        try {
            const moduleRef = doc(this.modulesCollection, menuId);

            const querySnapshot = await getDoc<Omit<IMenu, 'id'>>(moduleRef);

            return { id: querySnapshot.id, ...querySnapshot.data() } as IMenu
        } catch (error) {
            console.log(error)
        }
    }

    async createMenu(newMenu: Omit<IMenu, 'id'>) {
        try {
            const querySnapshot = await addDoc(this.modulesCollection, newMenu);
            const newModuleId = querySnapshot.id;
            return newModuleId
        } catch (error) {
            console.error("Error al crear el menú: ", error);
        }
    }

    async deleteMenu(idMenu: string) {
        //todo:terminar el return 
        try {
            const moduleRef = doc(this.modulesCollection, idMenu);
            await deleteDoc(moduleRef);
        } catch (error) {
            console.error("Error al eliminar el menú: ", error);
        }
    }

    async updateMenu(idMenu: string, { id, ...newMenu }: IMenu) {
        try {
            const moduleRef = doc(this.modulesCollection, idMenu);
            await updateDoc(moduleRef, newMenu);
            return { ok: true }
        } catch (error) {
            return { ok: false }
            console.error("Error al actualizar el menú: ", error);
        }
    }

    async inactiveMenu(idMenu: string) {
        try {
            const moduleRef = doc(this.modulesCollection, idMenu);
            await updateDoc(moduleRef, { status: "not-avalible" });
            return { ok: true }
        } catch (error) {
            console.error("Error al inactivar el menú: ", error);
            return { ok: false }
        }
    }

    async activeMenu(idMenu: string) {
        try {
            const moduleRef = doc(this.modulesCollection, idMenu);
            await updateDoc(moduleRef, { status: "avalible" });
            return { ok: true }
        } catch (error) {
            console.error("Error activar el menú: ", error);
            return { ok: false }
        }
    }

    listeningModules(onSet: (modules: IMenu[]) => void) {
        const queryData = query<Omit<IMenu, 'id'>>(this.modulesCollection, orderBy("order", "asc"));
        return onSnapshot(queryData, (querySnapshot) => {
            if (!querySnapshot.empty) {
                const modules: IMenu[] = []
                querySnapshot.forEach((doc) => modules.push({ id: doc.id, ...doc.data() }));
                onSet(modules)
            } else {
                onSet([])
            }
        });
    }

    listeningModule(moduleId: string, onSet: (modules: IMenu) => void) {
        const moduleRef = doc(this.modulesCollection, moduleId);
        return onSnapshot(moduleRef, (doc) => {
            const data = doc.data()
            onSet({ id: doc.id, ...data } as IMenu)
        });
    }
    

}

export const menuFirebaseService = new MenuFirebaseService()