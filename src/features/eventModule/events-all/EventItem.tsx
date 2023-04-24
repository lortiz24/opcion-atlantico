import { QrcodeOutlined, ScanOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Tooltip } from 'antd'
import React from 'react'
import { IEvent } from '../../../interfaces/events-interfaces';
import { IEventListProps } from './EventList';
import useGetMonitorSize from '../../../hooks/useGetMonitorSize';
import { timestampToString } from '../../../services/date-treatment/conversions';


interface IEventItemProps extends IEventListProps {
    eventItem: IEvent
}


const IconText = ({ icon, text, onClick }: { icon: React.FC; text: string, onClick: () => void }) => (
    <Space style={{ cursor: 'pointer' }} onClick={onClick}>
        {React.createElement(icon)}
        {text}
    </Space>
);

const EventItem = ({ eventItem, onGenerateQR, onReadQr }: IEventItemProps) => {
    const { width } = useGetMonitorSize()
    return (
        <List.Item
            actions={[
                <IconText onClick={() => onGenerateQR(eventItem.id)} icon={QrcodeOutlined} text="Generar QR" key="list-vertical-message" />,
                <IconText onClick={() => onReadQr()} icon={ScanOutlined} text="Marcar asistencia" key="list-vertical-message" />,
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