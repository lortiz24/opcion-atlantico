import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Modal, ModalProps, QRCode } from 'antd';

interface IGenerateQrProps extends ModalProps {
    eventAttendanceId: string
}
const GenerateQr = ({ open, eventAttendanceId, onCancel, onOk }: IGenerateQrProps) => {
    const [uuid, setUuid] = useState('');
    useEffect(() => {
        if (!uuid) setUuid(uuidv4());
        const intervalId = setInterval(() => {
            const newUuid = uuidv4();
            setUuid(newUuid);
        }, 15000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <Modal onOk={onOk} destroyOnClose width={'100%'} open={open} onCancel={onCancel} style={{ display: 'flex', justifyContent: 'center' }} >
            <QRCode value={uuid} size={400} />
        </Modal>
    )
}

export default GenerateQr