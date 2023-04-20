import { Avatar, Button, Card, List, Space, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import useGetEvents from '../../hooks/useGetEvents';
import { LikeOutlined, MessageOutlined, QrcodeOutlined, StarOutlined } from '@ant-design/icons';
import { LevelTitlesModules } from '../../settings/properties-globals/levels-titles';
import GenerateQr from './components/GenerateQr';
import ReadQr from './components/ReadQr';
import useIsMobile from '../../hooks/useIsMobile';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


const EventView = () => {
    const { events, loading } = useGetEvents()
    const [openGenerateQR, setOpenGenerateQR] = useState(false)
    const [eventAttendanceId, setEventAttendanceId] = useState('')
    const [isOpenReadQR, setisOpenReadQR] = useState(false)
    const { isMobile } = useIsMobile()
    const onGenerateQR = (eventId: string) => {
        setOpenGenerateQR(true)
        setEventAttendanceId(eventId)
    }

    const onCancelGenerateQR = () => {
        console.log('Aqui')
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
            <List

                loading={loading}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={events}
                renderItem={(eventItem) => (
                    <>
                        {isMobile ? (<List.Item
                            key={eventItem.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                <Button type='ghost' onClick={() => onGenerateQR(eventItem.id)}>Generar QR <QrcodeOutlined /></Button>,
                                <Button type='primary' onClick={() => onReadQr()}>Marcar Asistencia</Button>
                            ]}

                        >
                            <Card title={eventItem.title}>Card content</Card>
                        </List.Item>) : (
                            <List.Item
                                key={eventItem.title}
                                actions={[
                                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                    <Button type='ghost' onClick={() => onGenerateQR(eventItem.id)}>Generar QR <QrcodeOutlined /></Button>,
                                    <Button type='primary' onClick={() => onReadQr()}>Marcar Asistencia</Button>
                                ]}
                                extra={
                                    <img
                                        width={272}
                                        alt="logo"
                                        src={eventItem.img}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar.Group maxCount={4} maxStyle={{ color: 'white', backgroundColor: '#333F44' }}>
                                        {eventItem.assistants.map((assistant, key) => (
                                            <Tooltip key={assistant.id} title={assistant.name} placement='top'>
                                                <Avatar style={{ backgroundColor: '#333F44', color: 'white' }}>
                                                    {assistant.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                            </Tooltip>
                                        ))}
                                    </Avatar.Group>}
                                    title={eventItem.title}
                                    description={eventItem.date.toDate().toString()}
                                />
                                {eventItem.desciption}
                            </List.Item>)}
                    </>

                )}
            />

        </>
    )
}

export default EventView