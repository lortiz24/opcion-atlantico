import React from 'react'
import { Dropdown, List, MenuProps, Pagination } from 'antd';
import useGetEvents from '../../../hooks/useGetEvents';
import EventItem from './EventItem';
import { IEvent } from '../../../interfaces/events-interfaces';


export interface IEventListProps {
    onReadQr?: () => void;
    onGenerateQR?: (eventId: string) => void;
    onSelected?: (item: IEvent) => void
    eventList?: IEvent[]
    isLoading?: boolean
    onChecking?: (eventId: string) => void
    editable?: boolean
}


const EventList = ({ onReadQr, onGenerateQR, onSelected, eventList, isLoading, onChecking, editable }: IEventListProps) => {
    const { events, loading } = useGetEvents(undefined, { moderators: true, assistants: false })
    console.log(events)
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
                loading={isLoading ? isLoading : loading}
                dataSource={eventList ? eventList : events}
                renderItem={(eventItem) => (
                    <EventItem key={eventItem.title} eventItem={eventItem} onGenerateQR={onGenerateQR} onReadQr={onReadQr} onSelected={onSelected} onChecking={onChecking} editable={editable} />
                )}
            />
        </>

    )
}

export default EventList