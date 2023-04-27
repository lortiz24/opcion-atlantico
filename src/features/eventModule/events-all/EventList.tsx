import React from 'react'
import { Col, List, Row } from 'antd';
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
        <Row justify={'center'} >
            <List
                style={{ width: '100%', }}
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
                    <Col sm={24} lg={12}>
                        <EventItem key={eventItem.title} eventItem={eventItem} onGenerateQR={onGenerateQR} onReadQr={onReadQr} onSelected={onSelected} />
                    </Col>

                )}
            />
        </Row>

    )
}

export default EventList