import { StatusMenuItem } from "../../../../interfaces/modules-interface";

export interface IFormModules {
    nameMenu: string;
    pathMenu: string;
}

export interface IStatusMenuItems extends Record<StatusMenuItem, string> { }

export type StatusToRenderValues = 'Habilitada' | 'No habilitada'
