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
import { Dayjs } from 'dayjs'

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
                assistants: event.assistants,
                moderators: event.moderators
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
                    <Col xs={24} sm={20} md={18} lg={16}>
                        <Form form={form} onFinish={onSetDataForm} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Row gutter={[8, 8]}>
                                <Col span={24}>
                                    <Form.Item label='Nombre del evento' name={'title'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Input suffix={<IconsAntDesing.FormOutlined />} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>

                                    <Form.Item label='Lugar del evento' name={'place'} rules={[{ required: true, message: 'Es requerido' }]}>
                                        <Input
                                            suffix={<IconsAntDesing.EnvironmentOutlined />}
                                            // disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'} 
                                            />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item label='Descripcion del evento' name={'desciption'} >
                                        <TextArea
                                        />
                                    </Form.Item>
                                </Col>


                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label='Fecha inicio'
                                        name={'dateStart'}
                                        rules={[{ required: true, message: 'Es requerido' }]}
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

                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label='Hora de inicio'
                                        name={'timeStart'}
                                        rules={[{ required: true, message: 'Es requerido' }]}
                                    >
                                        <TimePicker
                                            inputReadOnly
                                            disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'}
                                            style={{ width: '100%' }}
                                            format={'h:mm A'}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label='Fecha fin'
                                        name={'dateEnd'}
                                        rules={[
                                            { required: true, message: 'Es requerido' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || !getFieldValue('dateStart')) {
                                                        // Si no hay fecha de inicio o fecha de fin, no hay nada que validar
                                                        return Promise.resolve();
                                                    }

                                                    if (value.isSameOrAfter(getFieldValue('dateStart'))) {
                                                        // Si la fecha de fin es igual o posterior a la fecha de inicio, la validación es exitosa
                                                        return Promise.resolve();
                                                    }

                                                    // Si la fecha de fin es anterior a la fecha de inicio, se devuelve un error
                                                    return Promise.reject(new Error('La fecha de fin no puede ser anterior a la fecha de inicio'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <DatePicker
                                            // disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'}
                                            style={{ width: '100%' }}
                                            picker='date'
                                            inputReadOnly
                                            format='DD MMMM YYYY'
                                            popupStyle={{ position: 'fixed' }}
                                            locale={locale}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label='Hora fin'
                                        name={'timeEnd'}
                                        rules={[
                                            { required: true, message: 'Es requerido' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value: Dayjs) {
                                                    if (!value || !getFieldValue('timeStart')) {
                                                        return Promise.resolve();
                                                    }
                                                    const startDate = getFieldValue('dateStart') as Dayjs;
                                                    const endDate = getFieldValue('dateEnd') as Dayjs;;
                                                    const timeStart = getFieldValue('timeStart')

                                                    if (startDate && endDate && startDate.isSame(endDate, 'day') && value.isBefore(timeStart)) {
                                                        return Promise.reject(new Error('La hora de fin debe ser mayor o igual a la hora de inicio'));
                                                    }

                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <TimePicker
                                            inputReadOnly
                                            // disabled={isEditFormEvent && getEventStatus(event?.dateStart as Timestamp, event?.dateEnd as Timestamp) !== 'before-starting'}
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