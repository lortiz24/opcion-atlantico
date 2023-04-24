import React from 'react'
import { List } from 'antd';
import useGetEvents from '../../../hooks/useGetEvents';
import EventItem from './EventItem';


export interface IEventListProps {
    onReadQr: () => void;
    onGenerateQR: (eventId: string) => void;
}


const EventList = ({ onReadQr, onGenerateQR }: IEventListProps) => {
    const { events, loading } = useGetEvents()

    return (
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
                    <EventItem key={eventItem.title} eventItem={eventItem} onGenerateQR={onGenerateQR} onReadQr={onReadQr} />
                </>

            )}
        />

    )
}

export default EventList