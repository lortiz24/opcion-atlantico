import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Modal, ModalProps, QRCode } from 'antd';
import LoadingComponent from '../../../../components/loading/LoadingComponent';
import { eventController } from '../../../../controllers/events/event.controller';
import useListeningQrByEventId from '../../../../hooks/useListeningQrByEventId';

interface IGenerateQrProps extends ModalProps {
    eventAttendanceId: string
}
const GenerateQr = ({ open, eventAttendanceId, onCancel, onOk }: IGenerateQrProps) => {
    const [qrCodeId, setqrCodeId] = useState<string | undefined>('')
    const { loading, qrToken } = useListeningQrByEventId(eventAttendanceId, qrCodeId)

    const generateToken = async () => {
        const newToken = uuidv4()
        const token = await eventController.getTokenByEventId(eventAttendanceId)
        if (token) {
            setqrCodeId(token.id)
        } else {
            const res = await eventController.createToken(eventAttendanceId, newToken)
            setqrCodeId(res)
        }
    }
    useEffect(() => {
        generateToken()
    }, []);
    return (
        <Modal onOk={onOk} destroyOnClose width={'100%'} open={open} onCancel={onCancel} style={{ display: 'flex', justifyContent: 'center' }} >
            {loading ? <LoadingComponent isLoading /> : <QRCode value={`http:\/\/${window.location.host}/#/${eventAttendanceId}/${qrToken.token}`} size={400} />}
        </Modal>
    )
}

export default GenerateQr