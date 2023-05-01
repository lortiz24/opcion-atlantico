import React, { Fragment, useEffect, useState } from 'react'
import { IEvent, IFormEvent } from '../../../../interfaces/events-interfaces'
import { Button, Col, DatePicker, Form, Input, Row, Space, Checkbox, Select, UploadFile, TimePicker } from 'antd'
import * as IconsAntDesing from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useAppSelector } from '../../../../store/store'
import MyTransferComponent from '../../../../components/transfer/MyTransferComponent'
import useGetUsers from '../../../../hooks/useGetUsers'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import MyUploadComponent from '../../../../components/upload/MyUploadComponent'
import TextArea from 'antd/es/input/TextArea'
import useGetEventById from '../../../../hooks/useGetEventById'
import LoadingComponent from '../../../../components/loading/LoadingComponent'
import { DateAdapter } from '../../../../services/date-service/Daily'
import { getEventStatus } from '../../../../helpers/event-helpers'
import { Timestamp } from 'firebase/firestore'
import locale from 'antd/es/date-picker/locale/es_ES';

interface IEventFormProps {
    event?: IEvent
    onSetValuesForm: (data: IFormEvent) => void
    titleButton: string
}



const FormEvent = ({ onSetValuesForm }: IEventFormProps) => {
    const { isLoadingFormEvent, eventId, isEditFormEvent } = useAppSelector(selector => selector.formEvent)
    const { users } = useGetUsers()
    const { event, loading: isLoadingEvent } = useGetEventById(eventId)
    const [form] = useForm<IFormEvent>();
    const [haveChildrens, setHaveChildrens] = useState(false)
    const [image, setImage] = useState<UploadFile[]>([])
    const [currenImage, setcurrenImage] = useState<UploadFile[]>([])
    const [typeInvitation, setTypeInvitation] = useState('')

    const onChangeInvitation = (typeInvitation: string) => {
        setTypeInvitation(typeInvitation)
    }

    const onChange = (e: CheckboxChangeEvent) => {
        setHaveChildrens(e.target.checked)
    }
    const onSetDataForm = (data: IFormEvent) => {
        data.imgForm = image
        if (isEditFormEvent) {
            data.img = event?.img
        }
        data.timeStart = data.timeStart.second(0)
        data.timeEnd = data.timeEnd.second(0)

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
            form.setFieldsValue({
                title: event.title,
                place: event.place,
                desciption: event.desciption,
                dateStart: dateStart.toDayjs(),
                timeStart: dateStart.toDayjs(),
                dateEnd: dateEnd.toDayjs(),
                timeEnd: dateEnd.toDayjs(),
                typeAttendance: event.typeAttendance,
                typeEvent: event.typeEvent,
                assistants: event.assistants
            })
            setTypeInvitation(event?.typeAttendance)
            if (event.moderators.length > 0) setHaveChildrens(true)
        }
    }, [eventId, event])

    if (isLoadingEvent) return <LoadingComponent isLoading={isLoadingEvent} />
    // todo: ponerel iconos y bucar name repetido
    return (
        <>
            <Fragment >
                <Row justify='center' wrap gutter={[8, 8]}>
                    <Col span={16}>
                        <Form form={form} onFinish={onSetDataForm} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Row gutter={[8, 8]}>
                                <Col span={24}>
                                    <Form.Item label='Nombre del evento' name={'title'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Input prefix={<IconsAntDesing.FormOutlined />} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>

                                    <Form.Item label='Lugar del evento' name={'place'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Input
                                            prefix={<IconsAntDesing.EnvironmentOutlined />}
                                            disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'} />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item label='Descripcion del evento' name={'desciption'} >
                                        <TextArea
                                        />
                                    </Form.Item>
                                </Col>
                                {/* <Col span={24}>
                                    <Form.Item label='Rango de fecha' name={'dateRange'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <DatePicker.RangePicker
                                            inputReadOnly
                                            disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'}
                                            showTime={{ format: 'HH:mm A', defaultValue: [new DateAdapter().setHour(0).setMinute(0).setSeconds(0).toDayjs(), new DateAdapter().setHour(0).setMinute(0).setSeconds(0).toDayjs()] }}
                                            format='YYYY-MM-DD h:mm A'
                                            style={{ width: '100%' }}
                                            locale={locale} />
                                    </Form.Item>
                                </Col> */}

                                <Col span={12}>
                                    <Form.Item
                                        label='Fecha inicio' name={'dateStart'} rules={[{ required: true, message: 'Es requerido' }]}
                                    >
                                        <DatePicker
                                            disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'}
                                            style={{ width: '100%' }}
                                            picker='date'
                                            inputReadOnly
                                            format='DD MMMM YYYY'
                                            popupStyle={{ position: 'fixed' }}
                                            locale={locale}
                                        />

                                    </Form.Item>

                                </Col>
                                <Col span={12}>
                                    <Form.Item label='Hora de inicio' name={'timeStart'}>
                                        <TimePicker
                                            inputReadOnly
                                            disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'}
                                            style={{ width: '100%' }}
                                            format={'h:mm A'}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label='Fecha fin' name={'dateEnd'} rules={[{ required: true, message: 'Es requerido' }]}
                                    >
                                        <DatePicker
                                            disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'}
                                            style={{ width: '100%' }}
                                            picker='date'
                                            inputReadOnly
                                            format='DD MMMM YYYY'
                                            popupStyle={{ position: 'fixed' }}
                                            locale={locale}
                                        />

                                    </Form.Item>

                                </Col>
                                <Col span={12}>
                                    <Form.Item label='Hora
                                     fin' name={'timeEnd'}>
                                        <TimePicker
                                            inputReadOnly
                                            disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'}
                                            placeholder='Seleccione la hora fin'
                                            style={{ width: '100%' }}
                                            format={'h:mm A'}
                                            locale={locale}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label='Tipo de asistencia' name={'typeAttendance'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Select

                                            disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'} onChange={onChangeInvitation} options={
                                                [{
                                                    label: 'Por invitacion',
                                                    value: 'invitation'
                                                },
                                                {
                                                    label: 'Libre',
                                                    value: 'free'
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
                                    {(typeInvitation === 'invitation' || typeInvitation === 'hybrid') &&
                                        <MyTransferComponent
                                            rules={[{ required: true, message: '"Minimo un participante' }]}
                                            disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'}
                                            targetKeys={event?.assistants}
                                            data={users}
                                            selectedRowKey={(recorder => recorder.id)} propertyRender={(item) => item.displayName}
                                            name={'assistants'}
                                            label='Asistentes'
                                            locale={{
                                                itemUnit: 'Participante', itemsUnit: 'Participantes', notFoundContent: 'La lista está vacía', searchPlaceholder: 'Buscar persona'
                                            }}
                                        />}
                                </Col>
                                <Form.Item label='Agregar moderadores' >
                                    <Checkbox onChange={onChange} checked={haveChildrens} />
                                </Form.Item>
                                {haveChildrens && <Col span={24}>
                                    <MyTransferComponent
                                        rules={[{ required: true, message: 'Sebe seleccionar al menos un moderador' }]}
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

                                <Button loading={isLoadingFormEvent} icon={<IconsAntDesing.SaveOutlined />} type='primary' htmlType='submit'>Guardar</Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Fragment >
        </>
    )
}

export default FormEvent