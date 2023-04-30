import React, { useEffect, useRef, useState } from 'react'
import useGetMonitorSize from '../../../hooks/useGetMonitorSize'

const useIsCollapseMenu = () => {
    const [isCollapsed, setCollapsed] = useState(false)
    const { isMobile } = useGetMonitorSize()
    const siderRef = useRef<HTMLDivElement>(null);
    const collapseButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMobile) setCollapsed(true)
    }, [isMobile])
    useEffect(() => {
        const handleDocumentClick = (event: any) => {
            if (!siderRef.current?.contains(event.target) && !collapseButtonRef.current?.contains(event.target as Node) && isMobile) {
                return setCollapsed(true);
            }
            if ((siderRef.current && !siderRef.current.contains(event.target) && (collapseButtonRef.current?.contains(event.target as Node)))) {
                return setCollapsed(current => !current);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);


    return {
        isCollapsed,
        setCollapsed,
        siderRef,
        collapseButtonRef
    }
}

export default useIsCollapseMenu