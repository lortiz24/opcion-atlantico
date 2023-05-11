import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Col, Modal, ModalProps, QRCode, Row, Space, theme } from 'antd';
import LoadingComponent from '../../../../components/loading/LoadingComponent';
import { eventController } from '../../../../controllers/events/event.controller';
import useListeningQrByEventId from '../../../../hooks/useListeningQrByEventId';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { onCancelGenerateQr } from '../../../../store/show-events/ShowEventSlice';
import useGetMonitorSize from '../../../../hooks/useGetMonitorSize';


const GenerateQr = () => {
    const { eventId, isGenerateQrOpen } = useAppSelector(selec => selec.showEvents)
    const { loading, token } = useListeningQrByEventId(eventId)
    const dispatch = useAppDispatch()
    const { isMobile, } = useGetMonitorSize()
    const { token: tokenThem } = theme.useToken();

    return (
        <Modal 
            title='Generate QR de asistencia'
            onOk={() => dispatch(onCancelGenerateQr())} destroyOnClose open={isGenerateQrOpen} onCancel={() => dispatch(onCancelGenerateQr())} bodyStyle={{ padding: 20 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <QRCode
                color={tokenThem.colorPrimary}
                status={loading ? 'loading' : 'active'}
                value={`http:\/\/${window.location.host}/#/check-qr-Attendance/${eventId}/${token}`}
                style={{ width: '100%' }}
                size={isMobile ? 300 : 400} />
        </Modal>
    )
}

export default GenerateQr