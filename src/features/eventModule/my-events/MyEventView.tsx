import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Col, Row, Space } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { openDrawerFormEvent } from '../../../store/form-events/formEventSlice'
import DrawerEventForm from '../events-all/DrawerEventForm'
import EventList from '../events-all/EventList'

const MyEventView = () => {
    const { isDrawerEventOpen } = useAppSelector(selector => selector.formEvent)
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
                <EventList onSelected={console.log} />
            </Col>
        </Row>
    )
}

export default MyEventView