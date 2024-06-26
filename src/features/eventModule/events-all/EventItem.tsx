import * as IconsAntDesing from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Col, Image, List, Popconfirm, Result, Row, Space, Statistic, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { IEvent } from '../../../interfaces/events-interfaces';
import { IEventListProps } from './EventList';
import { timestampToString } from '../../../services/date-treatment/conversions-date.utils';
import { ResultStatusType } from 'antd/es/result';
import MyGradiantBackground from '../../../components/gradiant-bacground/MyGradiantBackground';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { openEditionModeEvent } from '../../../store/form-events/formEventSlice';
import { deleteEventAsync } from '../../../store/form-events/event-thunk';
import { eventController } from '../../../controllers/events/event.controller';
import { getEventStatus } from '../../../helpers/event-helpers';
import { TransformationTypeInvitationEvent } from '../../../utils/events-utils/transformation-types.utils';
import ExpandableParagraph from '../../../components/expandable-paragraf/ExpandableParagraphComponent';
import useGetMonitorSize from '../../../hooks/useGetMonitorSize';
import { onChekingOpen, onGenerateQr, onGenerateUrl, onViewAttendance } from '../../../store/show-events/ShowEventSlice';
import { TooltipAdaptative } from '../../../components/toltop-custome/TooltipAdaptative';

interface IEventItemProps extends Omit<IEventListProps, 'eventList'> {
    eventItem: IEvent
}

const EventItem = ({ eventItem, typeView }: IEventItemProps) => {
    const [statusResult, setstatusResult] = useState<ResultStatusType>('info')
    const [messageByState, setMessageByState] = useState('')
    const [estado, setestado] = useState(true)
    const [iconResult, seticonResult] = useState('ClockCircleOutlined')
    const [actionsList, setActionsList] = useState<JSX.Element[]>([])
    const { uid } = useAppSelector(selector => selector.auth)
    const [checkUsersEvent, setcheckUsersEvent] = useState<'checking' | 'check' | 'not-check'>('checking')
    const { isMobile, isTable } = useGetMonitorSize()



    const userAlreadyCheck = async () => {
        const alreadyCheck = await eventController.alreadyCheck(uid ?? '', eventItem.id)
        if (alreadyCheck !== undefined && alreadyCheck === true) {
            setcheckUsersEvent('check')
        } else {
            setcheckUsersEvent('not-check')
        }
    }
    const dispatch = useAppDispatch()
    useEffect(() => {
        const status = getEventStatus(eventItem.dateStart, eventItem.dateEnd)
        if (status === 'finished') {
            setMessageByState('Finalizado')
            setstatusResult('error')
            seticonResult('CheckCircleOutlined')
            return
        }
        if (status === 'in-progress') {
            setMessageByState('En curso')
            setstatusResult('success')
            seticonResult('LoadingOutlined')
            return
        }

        setMessageByState('Por empezar')
        setstatusResult('info')
        seticonResult('ClockCircleOutlined')

    }, [eventItem.dateStart, estado])

    useEffect(() => {
        const actionsList = []
        if (getEventStatus(eventItem.dateStart, eventItem.dateEnd) === 'in-progress' || getEventStatus(eventItem.dateStart, eventItem.dateEnd) === 'before-starting') {
            if (uid === eventItem.anfitrion || eventItem.moderators.includes(uid ?? '')) {
                actionsList.push(
                    <TooltipAdaptative placement="topLeft" title={'Generar QR'} >
                        <Button type='text' icon={<IconsAntDesing.QrcodeOutlined />} onClick={() => {
                            const { dateStart, dateEnd, ...event } = eventItem
                            dispatch(onGenerateQr({ eventId: eventItem.id, typeView, event }))
                        }} />
                    </TooltipAdaptative>
                )
                actionsList.push(
                    <TooltipAdaptative placement="topLeft" title={'Marcar asistencias'} >
                        <Button disabled={getEventStatus(eventItem.dateStart, eventItem.dateEnd) === 'before-starting'} type='text' icon={<IconsAntDesing.CheckCircleOutlined />} onClick={() => {
                            const { dateStart, dateEnd, ...event } = eventItem
                            dispatch(onChekingOpen({ eventId: eventItem.id, typeView, event }))
                        }} />
                    </TooltipAdaptative>
                )

                actionsList.push(
                    <TooltipAdaptative placement="topLeft" title={'Generar URL'} >
                        <Button type='text' icon={<IconsAntDesing.LinkOutlined />} onClick={() => {
                            const { dateStart, dateEnd, ...event } = eventItem
                            dispatch(onGenerateUrl({ eventId: eventItem.id, typeView, event }))
                        }} />
                    </TooltipAdaptative>
                )
            }

            if (eventItem.typeAttendance === 'free' || eventItem.typeAttendance === 'hybrid') {
                //todo: poner boton de asistir para participantes
            }
        }
        if (uid === eventItem.anfitrion || eventItem.moderators.includes(uid ?? '')) {
            //todo: realizar ver asistentes y descargar asistentes
            actionsList.push(
                <TooltipAdaptative placement="topLeft" title={'Descargar asistentes'} >
                    <Button type='text' icon={<IconsAntDesing.DownCircleOutlined />} onClick={() => {
                        const { dateStart, dateEnd, ...event } = eventItem
                        dispatch(onGenerateQr({ eventId: eventItem.id, typeView, event }))
                    }} />
                </TooltipAdaptative>
            )

            actionsList.push(
                <TooltipAdaptative placement="topLeft" title={'Ver asistentes'} >
                    <Button type='text' icon={<IconsAntDesing.UserOutlined />} onClick={() => {
                        const { dateStart, dateEnd, ...event } = eventItem
                        dispatch(onViewAttendance({ eventId: eventItem.id, typeView, event }))
                    }} />
                </TooltipAdaptative>
            )
        }
        //Si estas en la vista de gestion de eventos
        if (typeView === 'gestion') {
            actionsList.push(
                <TooltipAdaptative placement="topLeft" title={'Editar evento'}>
                    <Button type='text' icon={<IconsAntDesing.EditOutlined />} onClick={() => dispatch(openEditionModeEvent({ eventId: eventItem.id }))} />
                </TooltipAdaptative>
            )

            actionsList.push(
                <Popconfirm
                    placement="bottom"
                    title='Eliminar el evento'
                    description={'Esta seguro que desea inactivar el submodulo'}
                    onConfirm={() => dispatch(deleteEventAsync(eventItem.id))}
                    okText="Si"
                    cancelText="No"
                >
                    <TooltipAdaptative placement="topLeft" title={'Eliminar evento'} >
                        <Button type='text' icon={<IconsAntDesing.DeleteOutlined />} />
                    </TooltipAdaptative>
                </Popconfirm>
            )


        }

        setActionsList(actionsList)
    }, [])

    useEffect(() => {
        userAlreadyCheck()
    }, [])

    return (
        <List.Item
        >
            <Badge.Ribbon
                style={{ zIndex: 2, display: (checkUsersEvent === 'checking' || (eventItem.typeAttendance === 'invitation' && !eventItem.assistants.includes(uid ?? ''))) ? 'none' : 'block' }}
                text={checkUsersEvent !== 'checking' && checkUsersEvent === 'check' ? 'Asistencia' : 'Sin asistir'}
                color={checkUsersEvent !== 'checking' && checkUsersEvent === 'check' ? 'green' : 'red'}
            >
                <Card
                    hoverable
                    style={{
                        cursor: 'default',
                        borderRadius: 16,
                    /*     backgroundImage: `url(${eventItem.img?.url ?? 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/events-image%2Fmaraton.jpg?alt=media&token=7a5ae84c-cf69-42ad-9c79-a8d34753a8d0'})`,
                        backgroundPosition: 'center', */
                        height: '100%',
                        position: 'relative',
                        zIndex: 1,
                    }}
                    bodyStyle={{
                        minHeight: 350,
                        width: '100%',
                        borderRadius: 15,
                        position: 'relative',
                        zIndex: 1,
                    }}
                    bordered={false}
                    actions={actionsList}
                >
                    <MyGradiantBackground colorLeft='#FAF9F7' colorRight='#E9BDCF' />
                    <Row justify={'center'} style={{ width: '100%' }} gutter={[8, 8]}>
                        <Col xs={24} sm={24} md={14} lg={16} xl={15} xxl={17}
                        >
                            <Col span={24}>
                                <Card.Meta
                                    title={eventItem.title}
                                    description={<ExpandableParagraph text={eventItem.desciption} length={50} />}
                                    avatar={
                                        !isMobile &&
                                        <Avatar.Group
                                            maxCount={4}
                                            maxStyle={{ color: 'white', backgroundColor: '#333F44' }}>
                                            {eventItem.forengData?.moderators?.map((moderator, key) => {
                                                return (
                                                    <TooltipAdaptative key={moderator.id} title={moderator.displayName} placement='top'>
                                                        <Avatar style={{ backgroundColor: '#333F44', color: 'white' }}>
                                                            {moderator.displayName.charAt(0).toUpperCase()}
                                                        </Avatar>
                                                    </TooltipAdaptative>
                                                )
                                            })}
                                        </Avatar.Group>}
                                    style={{ marginBottom: 10 }}
                                />
                            </Col>
                            <Col span={24} >
                                <Result
                                    style={{ paddingTop: '20px', paddingBottom: '0px' }}
                                    status={statusResult}
                                    /* @ts-ignore */
                                    icon={React.createElement(IconsAntDesing[iconResult])}
                                    title={<Typography.Title level={3} >{messageByState}</Typography.Title>}
                                    extra={
                                        statusResult === 'info' && (
                                            <Statistic.Countdown
                                                style={{ margin: 'auto' }}
                                                value={timestampToString(eventItem.dateStart, 'MM/DD/YYYY hh:mm A')}
                                                format='D [días] H [horas] m [minutos] s [segundos]'
                                                //no se porque sin el settimeout no funciona la verdad
                                                onFinish={() => {
                                                    setTimeout(() => {
                                                        setestado(!estado)
                                                    }, 2000)
                                                }}
                                            />
                                        )
                                    }
                                />

                            </Col>
                            <Col span={24}>

                                <Space wrap>
                                    <Typography.Text strong>Fecha incio:</Typography.Text>
                                    <Typography.Text code>{timestampToString(eventItem.dateStart, 'DD-MM-YYYY hh:mm A')}</Typography.Text>
                                </Space>

                                <Space wrap>
                                    <Typography.Text strong>Fecha fin: </Typography.Text>
                                    <Typography.Text code>{timestampToString(eventItem.dateEnd, 'DD-MM-YYYY hh:mm A')}</Typography.Text>
                                </Space>

                                <Space wrap>
                                    <Typography.Text strong>Lugar: </Typography.Text>
                                    <Typography.Text code style={{ textTransform: 'uppercase' }}>
                                        {eventItem.place}
                                    </Typography.Text>
                                </Space>
                                <Space wrap>
                                    <Typography.Text strong>Tipo de invitacion: </Typography.Text>
                                    <Typography.Text code style={{ textTransform: 'uppercase' }}>
                                        {TransformationTypeInvitationEvent[eventItem.typeAttendance]}
                                    </Typography.Text>
                                </Space>
                            </Col>
                        </Col>

                        <Col xs={0} sm={0} md={10} lg={8} xl={9} xxl={7}
                        > <Image
                                fallback={'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/events-image%2Fmaraton.jpg?alt=media&token=7a5ae84c-cf69-42ad-9c79-a8d34753a8d0'}
                                width={'100%'}
                                height={'100%'}
                                src={eventItem.img?.url !== null ? eventItem.img?.url : '../../../../public/opcion.jpg'}
                                alt="logo"
                                preview={false}
                                style={{ borderRadius: 20, objectFit: 'cover' }}
                            />
                        </Col>

                    </Row>

                </Card>
            </Badge.Ribbon>
        </List.Item >

    )
}

export default EventItem