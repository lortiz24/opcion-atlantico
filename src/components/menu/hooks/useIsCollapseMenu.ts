import React, { useEffect, useRef, useState } from 'react'
import useGetMonitorSize from '../../../hooks/useGetMonitorSize'

const useIsCollapseMenu = () => {
    const [isCollapsed, setCollapsed] = useState(false)
    const { isTable } = useGetMonitorSize()
    const siderRef = useRef<HTMLDivElement>(null);
    const collapseButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isTable) setCollapsed(true)
    }, [isTable])

    return {
        isCollapsed,
        setCollapsed,
        siderRef,
        collapseButtonRef
    }
}

export default useIsCollapseMenu