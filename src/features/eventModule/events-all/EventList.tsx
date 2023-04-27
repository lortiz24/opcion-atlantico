import React from 'react'
import { List, Pagination } from 'antd';
import useGetEvents from '../../../hooks/useGetEvents';
import EventItem from './EventItem';
import { IEvent } from '../../../interfaces/events-interfaces';


export interface IEventListProps {
    onReadQr?: () => void;
    onGenerateQR?: (eventId: string) => void;
    onSelected?: (item: IEvent) => void
}


const EventList = ({ onReadQr, onGenerateQR, onSelected }: IEventListProps) => {
    const { events, loading } = useGetEvents()

    return (
        <>
            <Pagination
                onChange={(page) => {
                    console.log(page);
                }}
                pageSize={3}
                total={events.length}
                style={{ marginBottom: 10 }}
            />
            <List
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 1,
                    xl: 2,
                    xxl: 2,
                }}
                loading={loading}
                dataSource={events}
                renderItem={(eventItem) => (
                    <EventItem key={eventItem.title} eventItem={eventItem} onGenerateQR={onGenerateQR} onReadQr={onReadQr} onSelected={onSelected} />
                )}
            />
        </>

    )
}

export default EventList