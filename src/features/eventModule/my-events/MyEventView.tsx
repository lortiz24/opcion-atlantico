import React from 'react'
import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Col, Row, Space } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { openDrawerFormEvent } from '../../../store/form-events/formEventSlice'
import DrawerEventForm from './components/DrawerEventForm'
import EventList from '../events-all/EventList'
import useListeningEvents from '../../../hooks/useListeningEvents'
import GenerateQr from '../events-all/components/GenerateQr'
import Checking from '../events-all/components/Checking'
import ViewAttendenceConfirmed from '../events-all/components/ViewAttendenceConfirmed'
import GenerateUrl from '../events-all/components/GenerateUrl'

const MyEventView = () => {
    const { isDrawerEventOpen } = useAppSelector(selector => selector.formEvent)
    const { uid } = useAppSelector(selector => selector.auth)
    const { isGenerateQrOpen, isCheckinManualOpen, isViewAttendence, isUrlModalOpen } = useAppSelector(selector => selector.showEvents)
    const { eventsListening, loading } = useListeningEvents([{ value: uid ?? '', operation: '==', nameProperty: 'anfitrion' }], { assistants: true, moderators: true })
    const dispatch = useAppDispatch()


    return (
        <Row>
            {isGenerateQrOpen && <GenerateQr />}
            {isCheckinManualOpen && <Checking />}
            {isViewAttendence && <ViewAttendenceConfirmed />}
            {isUrlModalOpen && <GenerateUrl />}
            <Col span={24}>
                {
                    isDrawerEventOpen && (
                        <DrawerEventForm />
                    )
                }

            </Col>
            <Col>
                <Space style={{ marginBottom: 20 }}>
                    <Button
                        icon={<PlusCircleFilled />}
                        type='primary'
                        onClick={() => dispatch(openDrawerFormEvent())}
                    >
                        Crear evento
                    </Button>
                </Space>
            </Col>
            <Col span={24}>
                <EventList eventList={eventsListening} isLoading={loading} typeView='gestion' />
            </Col>
        </Row>
    )
}

export default MyEventView