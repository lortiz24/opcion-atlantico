import { CheckCircleOutlined, QrcodeOutlined, ScanOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Image, List, Result, Row, Space, Statistic, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { IEvent } from '../../../interfaces/events-interfaces';
import { IEventListProps } from './EventList';
import useGetMonitorSize from '../../../hooks/useGetMonitorSize';
import { timestampAfterNow, timestampBeforeNow, timestampToString } from '../../../services/date-treatment/conversions-date.utils';
import { ResultStatusType } from 'antd/es/result';
import './eventAll.css'

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
    const { isTable } = useGetMonitorSize()
    const [statusResult, setstatusResult] = useState<ResultStatusType>('info')
    const [messageByState, setMessageByState] = useState('')
    useEffect(() => {
        if (timestampAfterNow(eventItem.dateStart) && timestampAfterNow(eventItem.dateEnd)) {
            setMessageByState('El evento esta por empezar')
            setstatusResult('info')
            return
        }
        if (timestampBeforeNow(eventItem.dateStart) && timestampAfterNow(eventItem.dateEnd)) {
            setMessageByState('El evento esta en curso')
            setstatusResult('success')
            return
        }
        if (timestampBeforeNow(eventItem.dateEnd)) {
            setMessageByState('El evento ya acabo')
            setstatusResult('warning')
        }
    }, [eventItem.dateStart])

    return (
        <List.Item
        /*  extra={<Image
             width={272}
             src={eventItem.img}
             alt="logo"
             preview={false}
             style={{ borderRadius: 20 }}
         />} */
        >
            <Card
                hoverable
                style={{ cursor: 'default', borderRadius: 15, }}
            // cover={<img alt="example" src={eventItem.img} />} 
            >
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
                <Row style={{ width: '100%' }} justify={'center'} gutter={[16, 16]}  >
                    <Col span={24} >
                        <Result
                            style={{ paddingTop: '20px', paddingBottom: '0px' }}
                            status={statusResult}
                            title={<Typography.Title level={3} >{messageByState}</Typography.Title>}
                            extra={
                                statusResult === 'info' && (
                                    <Statistic.Countdown
                                        style={{ margin: 'auto' }}
                                        value={timestampToString(eventItem.dateStart, 'MM/DD/YYYY hh:mm A')}
                                        format='D [días] H [horas] m [minutos] s [segundos]'
                                        onFinish={() => console.log('epa finalize')}
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

                    <Col span={24}>
                        <Space wrap>
                            {(onGenerateQR && (eventItem.typeAttendance === 'automatic' || eventItem.typeAttendance === 'hybrid')) && (
                                <>
                                    <IconText onClick={() => onGenerateQR(eventItem.id)} icon={QrcodeOutlined} text="Generar QR" />
                                    <IconText onClick={() => onGenerateQR(eventItem.id)} icon={ScanOutlined} text="Leer QR" />
                                </>
                            )}
                            {(onReadQr && (eventItem.typeAttendance === 'automatic' || eventItem.typeAttendance === 'hybrid')) && <IconText onClick={() => onReadQr()} icon={CheckCircleOutlined} text="Marcar asistencia"
                            />}
                        </Space>
                    </Col>
                </Row>
            </Card>
        </List.Item >
    )
}

export default EventItem