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
            if (isMobile) {
                if (
                    siderRef.current &&
                    !siderRef.current.contains(event.target) &&
                    collapseButtonRef.current &&
                    !collapseButtonRef.current.contains(event.target)
                ) {
                    setCollapsed(true);
                }
            } else {
                if (siderRef.current && !siderRef.current.contains(event.target)) {
                    setCollapsed(current=>!current);
                }
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [siderRef, collapseButtonRef]);


    return {
        isCollapsed,
        setCollapsed,
        siderRef,
        collapseButtonRef
    }
}

export default useIsCollapseMenu