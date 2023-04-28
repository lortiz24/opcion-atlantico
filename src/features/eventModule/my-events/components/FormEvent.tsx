import React, { Fragment, useEffect, useState } from 'react'
import { IEvent, IFormEvent } from '../../../../interfaces/events-interfaces'
import { Button, Col, DatePicker, Form, Input, Row, Space, Checkbox, Select, UploadFile } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useAppSelector } from '../../../../store/store'
import MyTransferComponent from '../../../../components/transfer/MyTransferComponent'
import useGetUsers from '../../../../hooks/useGetUsers'
import { IUserInfo } from '../../../../interfaces/user-interfaces'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import MyUploadComponent from '../../../../components/upload/MyUploadComponent'
import TextArea from 'antd/es/input/TextArea'
import useGetEvents from '../../../../hooks/useGetEvents'
import useGetEventById from '../../../../hooks/useGetEventById'
import LoadingComponent from '../../../../components/loading/LoadingComponent'
import { DateAdapter } from '../../../../services/date-service/Daily'
import dayjs from 'dayjs'


interface IEventFormProps {
    event?: IEvent
    onSetValuesForm: (data: IFormEvent) => void
    titleButton: string
}



const FormEvent = ({ onSetValuesForm }: IEventFormProps) => {
    const [form] = useForm<IFormEvent>();
    const { isLoadingFormEvent, eventId, isEditFormEvent } = useAppSelector(selector => selector.formEvent)
    const { users } = useGetUsers()
    const { event, loading: isLoadingEvent } = useGetEventById(eventId)
    const [haveChildrens, setHaveChildrens] = useState(false)
    const [image, setImage] = useState<UploadFile[]>([])
    const [currenImage, setcurrenImage] = useState<UploadFile[]>([])
    const onChange = (e: CheckboxChangeEvent) => {
        setHaveChildrens(e.target.checked)
    }


    const onSetDataForm = (data: IFormEvent) => {
        data.imgForm = image
        if (isEditFormEvent) {
            data.img = event?.img
        }
        data.dateStart = data.dateStart.second(0)
        data.dateEnd = data.dateEnd.second(0)
        onSetValuesForm(data)
    }
    useEffect(() => {
        if (isEditFormEvent && event) {
            if (event.img?.url) {
                setcurrenImage([{
                    url: event?.img?.url ?? '',
                    name: event?.img?.name ?? '',
                    uid: '-1'
                }])
                setImage([{
                    url: event?.img?.url ?? '',
                    name: event?.img?.name ?? '',
                    uid: '-1'
                }])
            }
            const dateStart = new DateAdapter(event.dateStart.toDate())
            const dateEnd = new DateAdapter(event.dateEnd.toDate())
            form.setFieldValue('title', event.title)
            form.setFieldValue('place', event.place)
            form.setFieldValue('desciption', event.desciption)
            form.setFieldValue('dateStart', dateStart.toDayjs())
            form.setFieldValue('dateEnd', dateEnd.toDayjs())
            form.setFieldValue('title', event?.title)
            form.setFieldValue('title', event?.title)
            if (event.moderators.length > 0) setHaveChildrens(true)
            form.setFieldValue('typeAttendance', event?.typeAttendance)
            form.setFieldValue('typeEvent', event?.typeEvent)
            form.setFieldValue('moderators', event?.moderators)
            form.setFieldValue('assistants', event?.assistants)
        }
    }, [eventId, event])

    if (isLoadingEvent) return <LoadingComponent isLoading={isLoadingEvent} />

    return (
        <>
            <Fragment >
                <Row justify='center' wrap gutter={[8, 8]}>
                    <Col span={16}>
                        <Form form={form} onFinish={onSetDataForm} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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
                                    <Form.Item label='Descripcion del evento' name={'desciption'} >
                                        <TextArea />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Space wrap>
                                        <Form.Item label='Fecha de inicio' name={'dateStart'} rules={[{ required: true, message: 'Es requerido' }]}>
                                            <DatePicker showTime format={'YYYY-MM-DD h:mm A'} style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item label='Fecha de finalizacion' name={'dateEnd'} rules={[{ required: true, message: 'Es requerido' }]}>
                                            <DatePicker showTime format={'YYYY-MM-DD h:mm A'} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <MyTransferComponent
                                        targetKeys={event?.assistants}
                                        data={users}
                                        selectedRowKey={(recorder => recorder.id)} propertyRender={(item) => item.displayName}
                                        name={'assistants'}
                                        label='Asistentes'
                                        locale={{
                                            itemUnit: 'Participante', itemsUnit: 'Participantes', notFoundContent: 'La lista está vacía', searchPlaceholder: 'Buscar persona'
                                        }}
                                    />
                                </Col>
                                <Form.Item label='Agregar moderadores' >
                                    <Checkbox onChange={onChange} checked={haveChildrens} />
                                </Form.Item>
                                {haveChildrens && <Col span={24}>
                                    <MyTransferComponent
                                        targetKeys={event?.moderators}
                                        data={users}
                                        selectedRowKey={(recorder => recorder.id)} propertyRender={(item) => item.displayName}
                                        name={'moderators'}
                                        label='Moderadores'
                                        locale={{
                                            itemUnit: 'Moderador', itemsUnit: 'Moderadores', notFoundContent: 'La lista está vacía', searchPlaceholder: 'Buscar persona'
                                        }}
                                    />
                                </Col>}
                                <Col span={24}>
                                    <Form.Item label='Tipo de asistencia' name={'typeAttendance'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Select options={
                                            [{
                                                label: 'Manual',
                                                value: 'manual'
                                            },
                                            {
                                                label: 'Automatico',
                                                value: 'automatic'
                                            },
                                            {
                                                label: 'Hibrido',
                                                value: 'hybrid'
                                            }
                                            ]
                                        }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label='Tipo de evento' name={'typeEvent'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Select options={
                                            [{
                                                label: 'Presencial',
                                                value: 'face-to-face'
                                            },
                                            {
                                                label: 'Virtual',
                                                value: 'virtual'
                                            },
                                            {
                                                label: 'Hibrido',
                                                value: 'hybrid'
                                            }
                                            ]
                                        }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <MyUploadComponent onSetFile={setImage} maxFiles={1} label='Imagen de perfil' name='img' currentFiles={currenImage} />
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

export default FormEvent