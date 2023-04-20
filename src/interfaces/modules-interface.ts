export type StatusMenuItem = 'avalible' | 'not-avalible'
export interface IModules {
    id: string
    label: string;
    children: IChildrensModules[];
    path: string
    order: number
    status: StatusMenuItem
    icon:string;
}

export interface IChildrensModules {
    label: string;
    path: string;
    order: number,
    status: StatusMenuItem
}

