import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import useGetQrCode from '../hooks/useGetQrCode';
import { Col, Modal, ModalProps, QRCode, Row, Space } from 'antd';

interface IGenerateQrProps extends ModalProps {
    open: boolean;
    eventAttendanceId: string
}
const GenerateQr = ({ open, eventAttendanceId, onCancel }: IGenerateQrProps) => {
    const [uuid, setUuid] = useState('');
    // const { codeQr, loading } = useGetQrCode()
    useEffect(() => {
        if (!uuid) setUuid(uuidv4());
        const intervalId = setInterval(() => {
            const newUuid = uuidv4();
            setUuid(newUuid);
        }, 15000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <Modal width={'100%'} open={open} onCancel={onCancel} style={{ display: 'flex', justifyContent: 'center' }} >
            <QRCode value={uuid} size={400} />
        </Modal>
    )
}

export default GenerateQr