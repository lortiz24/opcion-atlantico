import { Tooltip } from 'antd'
import { TooltipPropsWithOverlay } from 'antd/es/tooltip'
import React from 'react'
import useGetMonitorSize from '../../hooks/useGetMonitorSize'

interface Props extends TooltipPropsWithOverlay {
    children: React.ReactNode
}

export const TooltipAdaptative = ({ children, ...props }: Props) => {
    const { isTable } = useGetMonitorSize()

    if (isTable) {
        return (
            <> {children}</>
        )
    }


    return (
        <Tooltip {...props} >
            {children}
        </Tooltip>
    )
}
