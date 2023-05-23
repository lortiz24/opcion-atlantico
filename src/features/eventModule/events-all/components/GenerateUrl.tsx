import { Modal, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { onCancelGenerateUrl } from '../../../../store/show-events/ShowEventSlice'
import useListeningQrByEventId from '../../../../hooks/useListeningQrByEventId'
import useGetMonitorSize from '../../../../hooks/useGetMonitorSize'
import Paragraph from 'antd/es/typography/Paragraph'

const GenerateUrl = () => {
    const { isUrlModalOpen, eventId } = useAppSelector(selector => selector.showEvents)
    const dispatch = useAppDispatch()
    const { loading, token } = useListeningQrByEventId(eventId)
    const { isTable } = useGetMonitorSize()
    const [url, seturl] = useState('')
    useEffect(() => {
        seturl(`http:\/\/${window.location.host}/#/check-qr-Attendance/${eventId}/${token}`)
    }, [token])

    return (
        <Modal
            title='URL de asistencia'
            open={isUrlModalOpen}
            onCancel={() => dispatch(onCancelGenerateUrl())}
            onOk={() => dispatch(onCancelGenerateUrl())}
            bodyStyle={{ marginTop: 25 }}
            width={isTable ? '100%' : '50%'}
        >
            <Spin
                spinning={loading}
            >
                {!loading && <Paragraph copyable>{url}</Paragraph>}
                
            </Spin>
        </Modal>
    )
}

export default GenerateUrl