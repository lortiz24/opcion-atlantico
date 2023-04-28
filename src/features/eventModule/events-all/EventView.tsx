import React, { useState } from 'react'
import GenerateQr from './components/GenerateQr';
import EventList from './EventList';
import Checking from './components/Checking';

const EventView = () => {
    const [openGenerateQR, setOpenGenerateQR] = useState(false)
    const [eventId, setEventId] = useState('')
    const [isChecking, setIsChecking] = useState(false)
    const onGenerateQR = (eventId: string) => {
        setOpenGenerateQR(true)
        setEventId(eventId)
    }

    const onCancelGenerateQR = () => {
        setOpenGenerateQR(false)
    }

    return (
        <>
            {isChecking && <Checking isChecking={isChecking} onCancel={() => setIsChecking(false)} onOk={() => setIsChecking(false)}/>}
            {openGenerateQR && <GenerateQr open={openGenerateQR} eventAttendanceId={eventId} onCancel={onCancelGenerateQR} onOk={onCancelGenerateQR} />}

            <EventList onGenerateQR={onGenerateQR} onChecking={() => setIsChecking(true)} />

        </>
    )
}

export default EventView