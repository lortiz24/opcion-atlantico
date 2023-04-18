export interface IModules {
    label: string;
    children?: IChildrensModules[];
    path: string
}

export interface IChildrensModules {
    label: string;
    path: string;
}

