import React, { useState } from 'react'
import GenerateQr from './components/GenerateQr';
import EventList from './EventList';
import Checking from './components/Checking';
import { Tabs } from 'antd';
import useGetEvents from '../../../hooks/useGetEvents';
import { ICoditionsGetEvents } from '../../../interfaces/events-interfaces';
import { useAppSelector } from '../../../store/store';

const EventView = () => {
    const [openGenerateQR, setOpenGenerateQR] = useState(false)
    const [eventId, setEventId] = useState('')
    const [isChecking, setIsChecking] = useState(false)
    const [conditions, setConditions] = useState<ICoditionsGetEvents[]>([])
    const { events, loading } = useGetEvents(conditions, { moderators: true, assistants: false })
    const [keyActive, setkeyActive] = useState('1')
    const { uid } = useAppSelector(selector => selector.auth)
    const onGenerateQR = (eventId: string) => {
        setOpenGenerateQR(true)
        setEventId(eventId)
    }
    const onCancelGenerateQR = () => {
        setOpenGenerateQR(false)
    }

    const onChangeTab = (e: string) => {
        setkeyActive(e)

        if (e === '1') {
            setConditions([])
        }
        if (e === '2') {
            setConditions(current => [...current, { nameProperty: 'assistants', operation: 'array-contains', value: uid ?? '' }])
        }
    }
    return (
        <>
            {isChecking && <Checking isChecking={isChecking} onCancel={() => setIsChecking(false)} onOk={() => setIsChecking(false)} />}
            {openGenerateQR && <GenerateQr open={openGenerateQR} eventAttendanceId={eventId} onCancel={onCancelGenerateQR} onOk={onCancelGenerateQR} />}


            <Tabs onChange={onChangeTab} defaultActiveKey={keyActive} items={[
                {
                    key: '1',
                    label: 'Todos los eventos',
                    children: <EventList onGenerateQR={onGenerateQR} onChecking={() => setIsChecking(true)} eventList={events} isLoading={loading} />
                },
                {
                    key: '2',
                    label: 'Mis eventos',
                    children: <EventList onGenerateQR={onGenerateQR} onChecking={() => setIsChecking(true)} eventList={events} isLoading={loading} />
                },
            ]}>

            </Tabs>;

        </>
    )
}

export default EventView