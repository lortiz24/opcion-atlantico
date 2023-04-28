import * as IconsAntDesing from '@ant-design/icons';
import { Avatar, Button, Card, Col, Dropdown, Image, List, MenuProps, Popconfirm, Result, Row, Space, Statistic, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { IEvent } from '../../../interfaces/events-interfaces';
import { IEventListProps } from './EventList';
import { timestampAfterNow, timestampBeforeNow, timestampToString } from '../../../services/date-treatment/conversions-date.utils';
import { ResultStatusType } from 'antd/es/result';
import MyGradiantBackground from '../../../components/gradiant-bacground/MyGradiantBackground';
import { useAppSelector } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import { openEditionModeEvent } from '../../../store/form-events/formEventSlice';
import { deleteEventAsync } from '../../../store/form-events/event-thunk';
import { DateAdapter } from '../../../services/date-service/Daily';
import dayjs from 'dayjs';

interface IEventItemProps extends IEventListProps {
    eventItem: IEvent
}


const IconText = ({ icon, text, onClick }: { icon: React.FC; text: string, onClick: () => void }) => (
    <Space style={{ cursor: 'pointer' }} onClick={onClick}>
        {React.createElement(icon)}
        {text}
    </Space>
);


const EventItem = ({ eventItem, onGenerateQR, onReadQr, onSelected, onChecking, editable }: IEventItemProps) => {
    const [statusResult, setstatusResult] = useState<ResultStatusType>('info')
    const [messageByState, setMessageByState] = useState('')
    const [estado, setestado] = useState(true)
    const [iconResult, seticonResult] = useState('ClockCircleOutlined')
    const [actionsList, setActionsList] = useState<JSX.Element[]>([])
    const dispatch = useAppDispatch()
    useEffect(() => {
        const dateStart = new DateAdapter(eventItem.dateStart.toDate())
        const dateEnd = new DateAdapter(eventItem.dateEnd.toDate())

        if (dateStart.isBeforeNow() && dateEnd.isBeforeNow()) {
            setMessageByState('Finalizado')
            setstatusResult('error')
            seticonResult('CheckCircleOutlined')
            return
        }
        if (dateStart.isSameOrBeforeNow() && dateEnd.isAfterNow()) {
            setMessageByState('En curso')
            setstatusResult('success')
            seticonResult('LoadingOutlined')
            return
        }

        if (dateStart.isAfterNow() && dateEnd.isAfterNow()) {
            setMessageByState('Por empezar')
            setstatusResult('info')
            seticonResult('ClockCircleOutlined')
        }

    }, [eventItem.dateStart, estado])

    useEffect(() => {
        const actionsList = []
        if (onGenerateQR) {
            actionsList.push(<Tooltip placement="topLeft" title={'Generar QR'} >
                <Button type='text' icon={<IconsAntDesing.QrcodeOutlined />} onClick={() => onGenerateQR(eventItem.id)} />
            </Tooltip>)
        }
        if (onReadQr) {
            actionsList.push(
                <Tooltip placement="topLeft" title={'Leer QR'} >
                    <Button type='text' icon={<IconsAntDesing.ScanOutlined />} onClick={() => onReadQr()} />
                </Tooltip>
            )
        }
        if (onChecking && (['manual', 'hybrid'].includes(eventItem.typeAttendance))) {
            console.log('viendo')
            actionsList.push(
                <Tooltip placement="topLeft" title={'Cheking de asistentes'} >
                    <Button type='text' icon={<IconsAntDesing.CheckCircleOutlined />} onClick={() => onChecking(eventItem.id)} />
                </Tooltip>
            )
        }
        if (editable) {
            actionsList.push(
                <Tooltip placement="topLeft" title={'Editar evento'} >
                    <Button type='text' icon={<IconsAntDesing.EditOutlined />} onClick={() => dispatch(openEditionModeEvent({ eventId: eventItem.id }))} />
                </Tooltip>
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
                    <Tooltip placement="topLeft" title={'Eliminar evento'} >
                        <Button type='text' icon={<IconsAntDesing.DeleteOutlined />} />
                    </Tooltip>
                </Popconfirm>
            )
        }
        setActionsList(actionsList)
    }, [])
console.log('moderadores',eventItem.forengData?.moderators)
    return (
        <List.Item
        >
            <Card

                hoverable
                style={{
                    cursor: 'default',
                    borderRadius: 16,
                    // backgroundImage: `url(${eventItem.img})`,
                    backgroundPosition: 'center',
                    height: '100%',
                    position: 'relative',
                    zIndex: 1,
                }}
                bodyStyle={{
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
                                description={eventItem.desciption}
                                avatar={
                                    <Avatar.Group
                                        maxCount={4}
                                        maxStyle={{ color: 'white', backgroundColor: '#333F44' }}>
                                        {eventItem.forengData?.moderators?.map((moderator, key) => {
                                            console.log('',moderator)
                                            return (
                                                <Tooltip key={moderator.id} title={moderator.displayName} placement='top'>
                                                    <Avatar style={{ backgroundColor: '#333F44', color: 'white' }}>
                                                        {moderator.displayName.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                </Tooltip>
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
                        </Col>
                    </Col>

                    <Col xs={0} sm={0} md={10} lg={8} xl={9} xxl={7}
                    > <Image
                            fallback={'../../../../public/opcion.jpg'}
                            width={'100%'}
                            height={'100%'}
                            src={eventItem.img?.url}
                            alt="logo"
                            preview={false}
                            style={{ borderRadius: 20, objectFit: 'cover' }}
                        />
                    </Col>

                </Row>
            </Card>
        </List.Item >

    )
}

export default EventItem