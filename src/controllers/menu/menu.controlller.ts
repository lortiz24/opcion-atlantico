import { menuFirebaseService } from "../../firebase/menu/menu-firebase.service";
import { IMenu } from "../../interfaces/modules-interface";

export class MenuController {
    constructor(
        private menuService = menuFirebaseService
    ) { }

    async getMenus(condition?: { order: boolean }) {
        if (condition?.order) {
            const menus = await this.menuService.getMenusToSlice()
            return menus
        }
        const menus = await this.menuService.getMenus()
        return menus
    }
    async getMenu(menuId: string) {
        const menu = await this.menuService.getModule(menuId)
        return menu
    }
    async createMenu(newMenu: Omit<IMenu, 'id'>) {
        const newMenuId = await this.menuService.createMenu(newMenu)
        return newMenuId

    }
    async updateMenu(menuId: string, updateMenu: IMenu) {
        const newMenuId = await this.menuService.updateMenu(menuId, updateMenu)
        return newMenuId
    }
    async inactiveMenu(menuId: string) {
        const newMenuId = await this.menuService.inactiveMenu(menuId)
        return newMenuId
    }
    async activeMenu(menuId: string) {
        const newMenuId = await this.menuService.activeMenu(menuId)
        return newMenuId
    }
    async deleteMenu(menuId: string) {
        const newMenuId = await this.menuService.deleteMenu(menuId)
        return newMenuId
    }
    listeningMenus(onSet: (menus: IMenu[]) => void) {
        const newMenuId = this.menuService.listeningModules(onSet)
        return newMenuId
    }
    listeningMenu(menuId: string, onSet: (menu: IMenu) => void) {
        const newMenuId = this.menuService.listeningModule(menuId, onSet)
        return newMenuId
    }
}

export const menuController = new MenuController()