import React from 'react'
import GenerateQr from './components/GenerateQr';
import Checking from './components/Checking';
import { Tabs } from 'antd';
import { useAppSelector } from '../../../store/store';
import EventAll from './components/EventAll';
import EventParticipants from './components/EventParticipants';
import EventModerator from './components/EventModerator';
import ViewAttendenceConfirmed from './components/ViewAttendenceConfirmed';
import GenerateUrl from './components/GenerateUrl';

const EventView = () => {
    const { isCheckinManualOpen, isUrlModalOpen, isGenerateQrOpen, isViewAttendence } = useAppSelector(selector => selector.showEvents)
    return (
        <>
            {isGenerateQrOpen && <GenerateQr />}
            {isCheckinManualOpen && <Checking />}
            {isViewAttendence && <ViewAttendenceConfirmed />}
            {isUrlModalOpen && <GenerateUrl />}

            <Tabs items={[
                {
                    key: '1',
                    label: 'Todos los eventos',
                    children: <EventAll />
                },
                {
                    key: '2',
                    label: 'Soy invitado',
                    children: <EventParticipants />
                },
                {
                    key: '3',
                    label: 'Soy moderador',
                    children: <EventModerator />
                },
            ]}>

            </Tabs>;

        </>
    )
}

export default EventView