import React, { ReactElement, useEffect, useState } from 'react'
import * as IconsAntDesing from '@ant-design/icons';

const useGetIconStringList = () => {
    const [iconListString, setIconListString] = useState([] as string[])
    const [iconListElements, setIconListElements] = useState([] as ReactElement[])
    const [isLoadingIconList, setIsLoadingIconList] = useState(true)

    useEffect(() => {
        const iconStrinList = Object.keys(IconsAntDesing).filter(item => !['createFromIconfontCN', 'default', 'getTwoToneColor', 'setTwoToneColor'].includes(item))
        setIconListString(iconStrinList)
        setIconListElements(iconStrinList.map(item => React.createElement(item)))
        setIsLoadingIconList(false)
    }, [])

    return {
        isLoadingIconList,
        iconListString,
        iconListElements
    }
}

export default useGetIconStringList