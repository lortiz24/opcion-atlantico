import { Modal, ModalProps } from 'antd'
import React from 'react'

interface ICheckingProps extends ModalProps {
    isChecking: boolean
}
const Checking = ({ isChecking, onCancel, onOk }: ICheckingProps) => {
    return (
        <Modal
            open={isChecking}
            destroyOnClose
            onCancel={onCancel}
            onOk={onOk}>Checking</Modal>
    )
}

export default Checking