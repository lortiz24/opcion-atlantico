import { ThemeConfig } from "antd";
import { AliasToken } from "antd/es/theme/internal";

export const AntDesingToken: Partial<AliasToken> = {
    colorPrimary: '#E50053',
}

export const AntDesingTheme: ThemeConfig = {
    components: {
        Layout: {
            colorBgHeader: '#ffffff',
        },
        Menu: {
            colorText: '#E50053'
        }
    },
    token: AntDesingToken
}