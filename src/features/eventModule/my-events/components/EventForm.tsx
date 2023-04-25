import React, { Fragment } from 'react'
import { IEvent } from '../../../../interfaces/events-interfaces'
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useAppSelector } from '../../../../store/store'
import MyTransferComponent from '../../../../components/transfer/MyTransferComponent'
import useGetUsers from '../../../../hooks/useGetUsers'


interface IEventFormProps {
    event?: IEvent
    onSetValuesForm: (data: IFormEvent) => void
    titleButton: string
}

interface IFormEvent {

}


const EventForm = ({ event, onSetValuesForm }: IEventFormProps) => {
    const [form] = useForm();
    const { isLoadingFormEvent } = useAppSelector(selector => selector.formEvent)
    const { isLoadingUsers, users } = useGetUsers()
    return (
        <>
            <Fragment >
                <Row justify='center' wrap gutter={[8, 8]}>
                    <Col span={16}>
                        <Form form={form} onFinish={onSetValuesForm} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Row>

                                <Col span={24}>
                                    <Form.Item label='Nombre del evento' name={'title'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>

                                    <Form.Item label='Lugar del evento' name={'place'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>

                                    <Form.Item label='Descripcion del evento' name={'desciption'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Space wrap>
                                        <Form.Item label='Fecha de inicio' name={'dateStart'} rules={[{ required: true, message: 'Es requerido' }]}>
                                            <DatePicker style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item label='Fecha de finalizacion' name={'dateEnd'} rules={[{ required: true, message: 'Es requerido' }]}>
                                            <DatePicker style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label='Asistentes' name={'assistants'} >
                                        <MyTransferComponent onSetTargetKey={console.log} data={users} selectedRowKey={(recorder => recorder.id)} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label='Tipo de asistencia' name={'typeAttendance'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label='Imagen del evento' name={'img'} >
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Button loading={isLoadingFormEvent} icon={<SaveOutlined />} type='primary' htmlType='submit'>Guardar</Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Fragment >
        </>
    )
}

export default EventForm