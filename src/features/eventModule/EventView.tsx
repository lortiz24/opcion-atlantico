import { Button, Col, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { LevelTitlesModules } from '../../settings/properties-globals/levels-titles';
import GenerateQr from './components/GenerateQr';
import ReadQr from './components/ReadQr';
import EventList from './events-all/EventList';
import { PlusCircleFilled } from '@ant-design/icons';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


const EventView = () => {
    const [openGenerateQR, setOpenGenerateQR] = useState(false)
    const [eventAttendanceId, setEventAttendanceId] = useState('')
    const [isOpenReadQR, setisOpenReadQR] = useState(false)

    const onGenerateQR = (eventId: string) => {
        setOpenGenerateQR(true)
        setEventAttendanceId(eventId)
    }

    const onCancelGenerateQR = () => {
        setOpenGenerateQR(false)
    }

    const onReadQr = () => {
        setisOpenReadQR(true)
    }

    const onCloseReadQr = () => {
        setisOpenReadQR(false)
    }
    return (
        <>
            {isOpenReadQR && <ReadQr open={isOpenReadQR} onCancel={onCloseReadQr} onOk={onCloseReadQr} />}
            {openGenerateQR && <GenerateQr open={openGenerateQR} eventAttendanceId={eventAttendanceId} onCancel={onCancelGenerateQR} onOk={onCancelGenerateQR} />}
            <Typography.Title level={LevelTitlesModules}>Eventos</Typography.Title>
            <br />
            <Row>
                <Col>
                    <Space style={{ marginBottom: 20 }}>
                        <Button
                            icon={<PlusCircleFilled />}
                            type='primary'
                        // onClick={() => dispatch(openDrawer())}
                        >
                            Crear evento
                        </Button>
                    </Space>
                </Col>
                <Col span={24}>
                    <EventList onReadQr={onReadQr} onGenerateQR={onGenerateQR} />
                </Col>
            </Row>

        </>
    )
}

export default EventView