import { Button, Col, Row, Space } from 'antd'
import React, { useState } from 'react'
import GenerateQr from './components/GenerateQr';
import ReadQr from './components/ReadQr';
import EventList from './EventList';
import { PlusCircleFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { openDrawerFormEvent } from '../../../store/form-events/formEventSlice';
import DrawerEventForm from '../my-events/components/DrawerEventForm';

const EventView = () => {
    const [openGenerateQR, setOpenGenerateQR] = useState(false)
    const [eventAttendanceId, setEventAttendanceId] = useState('')
    const [isOpenReadQR, setisOpenReadQR] = useState(false)
    const { isDrawerEventOpen } = useAppSelector(selector => selector.formEvent)
    const dispatch = useAppDispatch()
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

            <EventList onReadQr={onReadQr} onGenerateQR={onGenerateQR} />

        </>
    )
}

export default EventView