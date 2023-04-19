import { ThemeConfig } from "antd";
import { AliasToken } from "antd/es/theme/internal";

export const AntDesingToken: Partial<AliasToken> = {
    colorPrimary: '#a40c4c',
}

export const AntDesingTheme: ThemeConfig = {
    components: {
        Layout: {
            colorBgHeader: '#ffffff',
        },
    },
    
    token: AntDesingToken
}