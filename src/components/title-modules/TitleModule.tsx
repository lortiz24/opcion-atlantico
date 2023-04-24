import { Typography } from 'antd'
import React from 'react'
import { LevelTitlesModules } from '../../settings/properties-globals/levels-titles'


interface ITitleModuleProps {
    title: string,
    children: React.ReactElement
}
const TitleModule = ({ children, title }: ITitleModuleProps) => {
    return (
        <>
            <Typography.Title level={LevelTitlesModules}>{title}</Typography.Title>
            <br />
            {children}
        </>
    )
}

export default TitleModule