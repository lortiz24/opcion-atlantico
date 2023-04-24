import { LikeOutlined, MessageOutlined, QrcodeOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, List, Space, Tooltip } from 'antd'
import React from 'react'
import { IEvents } from '../../../interfaces/events-interfaces';
import { IEventListProps } from './EventList';
import useGetMonitorSize from '../../../hooks/useGetMonitorSize';
import { timestampToString } from '../../../services/date-treatment/conversions';


interface IEventItemProps extends IEventListProps {
    eventItem: IEvents
}


const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


const EventItem = ({ eventItem, onGenerateQR, onReadQr }: IEventItemProps) => {
    const { width } = useGetMonitorSize()
    return (
        <List.Item
            actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                <Button type='ghost' onClick={() => onGenerateQR(eventItem.id)}>Generar QR <QrcodeOutlined /></Button>,
                <Button type='primary' onClick={() => onReadQr()}>Marcar Asistencia</Button>
            ]}
            extra={
                width > 700 ? (<img
                    width={272}
                    alt="logo"
                    src={eventItem.img}
                />) : <></>
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
                description={timestampToString(eventItem.date, 'YYYY-MM-DD hh:mm A')}
            />
            {eventItem.desciption}
        </List.Item >
    )
}

export default EventItem