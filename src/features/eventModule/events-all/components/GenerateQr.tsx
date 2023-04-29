import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Col, Modal, ModalProps, QRCode, Row, Space, theme } from 'antd';
import LoadingComponent from '../../../../components/loading/LoadingComponent';
import { eventController } from '../../../../controllers/events/event.controller';
import useListeningQrByEventId from '../../../../hooks/useListeningQrByEventId';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { onCancelGenerateQr } from '../../../../store/show-events/ShowEventSlice';
import useGetMonitorSize from '../../../../hooks/useGetMonitorSize';



interface IGenerateQrProps extends ModalProps {
    eventAttendanceId: string
}
const GenerateQr = () => {
    const [qrCodeId, setqrCodeId] = useState<string | undefined>('')
    const { eventId, isGenerateQrOpen } = useAppSelector(selec => selec.showEvents)
    const { loading, qrToken } = useListeningQrByEventId(eventId, qrCodeId)
    const dispatch = useAppDispatch()
    const { isMobile, windowSize: { height } } = useGetMonitorSize()
    const { token } = theme.useToken();
    const generateToken = async () => {
        const newToken = uuidv4()
        const token = await eventController.getTokenByEventId(eventId)
        if (token) {
            setqrCodeId(token.id)
        } else {
            const res = await eventController.createToken(eventId, newToken)
            setqrCodeId(res)
        }
    }
    useEffect(() => {
        generateToken()
    }, []);


    return (
        <Modal onOk={() => dispatch(onCancelGenerateQr())} destroyOnClose open={isGenerateQrOpen} onCancel={() => dispatch(onCancelGenerateQr())} bodyStyle={{ padding: 20 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <QRCode
                color={token.colorPrimary}
                status={loading ? 'loading' : 'active'}
                value={`http:\/\/${window.location.host}/#/check-qr-Attendance/${eventId}/${qrToken.token}`}
                style={{ width: '100%' }}
                size={isMobile ? 300 : 400} />
        </Modal>
    )
}

export default GenerateQr