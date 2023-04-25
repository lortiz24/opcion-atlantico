
export type StatusMenuItem = 'avalible' | 'not-avalible'
export interface IMenu {
    id: string
    label: string;
    children: IChildrensModules[];
    path: string
    order: number
    status: StatusMenuItem
    icon: string;
    rolAcces: string[]
}

export interface IChildrensModules {
    label: string;
    path: string;
    order: number,
    status: StatusMenuItem
}

export interface IConditionGetMenus {
    order?: boolean;
    rols?: string[]
}

