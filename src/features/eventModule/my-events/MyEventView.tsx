import React from 'react'
import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Col, Row, Space } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { openDrawerFormEvent } from '../../../store/form-events/formEventSlice'
import DrawerEventForm from './components/DrawerEventForm'
import EventList from '../events-all/EventList'
import useListeningEvents from '../../../hooks/useListeningEvents'

const MyEventView = () => {
    const { isDrawerEventOpen } = useAppSelector(selector => selector.formEvent)
    const { uid } = useAppSelector(selector => selector.auth)
    const { eventsListening, loading } = useListeningEvents([{ value: uid ?? '', operation: '==', nameProperty: 'anfitrion' }], { moderators: true, assistants: true })
    const dispatch = useAppDispatch()
    return (
        <Row>
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
                <EventList onSelected={console.log} eventList={eventsListening} isLoading={loading} editable />
            </Col>
        </Row>
    )
}

export default MyEventView