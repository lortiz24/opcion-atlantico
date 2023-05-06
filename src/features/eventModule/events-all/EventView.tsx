import React from 'react'
import GenerateQr from './components/GenerateQr';
import Checking from './components/Checking';
import { useAppSelector } from '../../../store/store';
import EventAll from './components/EventAll';
import ViewAttendenceConfirmed from './components/ViewAttendenceConfirmed';
import GenerateUrl from './components/GenerateUrl';

const EventView = () => {
    const { isCheckinManualOpen, isUrlModalOpen, isGenerateQrOpen, isViewAttendence } = useAppSelector(selector => selector.showEvents)
    return (
        <>
            {isGenerateQrOpen && <GenerateQr />}
            {isCheckinManualOpen && <Checking />}
            {isUrlModalOpen && <GenerateUrl />}
            {isViewAttendence && <ViewAttendenceConfirmed />}

            <EventAll />

        </>
    )
}

export default EventView