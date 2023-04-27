import * as IconsAntDesing from '@ant-design/icons';
import { Avatar, Button, Card, Col, Image, List, Result, Row, Space, Statistic, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { IEvent } from '../../../interfaces/events-interfaces';
import { IEventListProps } from './EventList';
import { timestampAfterNow, timestampBeforeNow, timestampToString } from '../../../services/date-treatment/conversions-date.utils';
import { ResultStatusType } from 'antd/es/result';
import './eventAll.css'
import MyGradiantBackground from '../../../components/gradiant-bacground/MyGradiantBackground';

interface IEventItemProps extends IEventListProps {
    eventItem: IEvent
}


const IconText = ({ icon, text, onClick }: { icon: React.FC; text: string, onClick: () => void }) => (
    <Space style={{ cursor: 'pointer' }} onClick={onClick}>
        {React.createElement(icon)}
        {text}
    </Space>
);

const EventItem = ({ eventItem, onGenerateQR, onReadQr, onSelected }: IEventItemProps) => {
    const [statusResult, setstatusResult] = useState<ResultStatusType>('info')
    const [messageByState, setMessageByState] = useState('')
    const [estado, setestado] = useState(true)
    const [iconResult, seticonResult] = useState('ClockCircleOutlined')

    useEffect(() => {
        if (timestampAfterNow(eventItem.dateStart) && timestampAfterNow(eventItem.dateEnd)) {
            setMessageByState('Por empezar')
            setstatusResult('info')
            seticonResult('ClockCircleOutlined')
            return
        }
        if (timestampBeforeNow(eventItem.dateStart) && timestampAfterNow(eventItem.dateEnd)) {
            setMessageByState('En curso')
            setstatusResult('success')
            seticonResult('LoadingOutlined')
            return
        }
        if (timestampBeforeNow(eventItem.dateEnd)) {
            setMessageByState('Finalizado')
            setstatusResult('error')
            seticonResult('CheckCircleOutlined')
        }
    }, [eventItem.dateStart])
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
                actions={[
                    (onGenerateQR && <Button type='text' icon={<IconsAntDesing.QrcodeOutlined />} onClick={() => onGenerateQR(eventItem.id)} />),
                    (onReadQr && <Button type='text' icon={<IconsAntDesing.ScanOutlined />} onClick={() => onReadQr()} />),
                    (onReadQr && (eventItem.typeAttendance === 'automatic' || eventItem.typeAttendance === 'hybrid'))
                    &&
                    <Button type='text' icon={<IconsAntDesing.CheckCircleOutlined />} onClick={() => onReadQr()} />
                ]}
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
                                            onFinish={() => {
                                                console.log('epa finalize')
                                                setestado(!estado)
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
                            width={'100%'}
                            height={'100%'}
                            src={eventItem.img}
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