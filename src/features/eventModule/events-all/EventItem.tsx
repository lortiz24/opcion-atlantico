import { QrcodeOutlined, ScanOutlined, SmileOutlined } from '@ant-design/icons';
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
    const { windowSize: { width }, isTable } = useGetMonitorSize()
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
        <Card hoverable bordered={false} style={{ height: '100%', cursor: 'default', borderRadius: 50 }}>
            <List.Item
                onClick={() => {
                    if (onSelected) onSelected(eventItem)
                }}
                /*   actions={[
                      <Space wrap key={'f216e1f5e1f'}>
                          {onGenerateQR && <IconText onClick={() => onGenerateQR(eventItem.id)} icon={QrcodeOutlined} text="Generar QR" />}
                          {onReadQr && <IconText onClick={() => onReadQr()} icon={ScanOutlined} text="Marcar asistencia" />}
                      </Space>
                  ]} */
                extra={
                    !isTable ? (
                        <>
                            <Col span={24}>
                                <Image
                                    width={272}
                                    src={eventItem.img}
                                    alt="logo"
                                    preview={false}
                                    style={{ borderRadius: 20 }}
                                />
                            </Col>
                            <Space wrap key={'f216e1f5e1f'} style={{ marginTop: 10 }}>
                                {onGenerateQR && <IconText onClick={() => onGenerateQR(eventItem.id)} icon={QrcodeOutlined} text="Generar QR" />}
                                {onReadQr && <IconText onClick={() => onReadQr()} icon={ScanOutlined} text="Marcar asistencia" />}
                            </Space>
                        </>
                    ) : <></>
                }
            >
                <List.Item.Meta
                    avatar={<Avatar icon='L'/>}
                    title={onGenerateQR && <IconText onClick={() => onGenerateQR(eventItem.id)} icon={QrcodeOutlined} text="Generar QR" />}
                    description={onReadQr && <IconText onClick={() => onReadQr()} icon={ScanOutlined} text="Marcar asistencia" />}
                />
                <Row justify='center' align='middle' gutter={[16, 16]} style={{ alignItems: 'flex-end' }}>
                    <Col span={24}>
                        <Result
                            style={{ paddingTop: '2px', paddingBottom: '20px' }}
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
                    <Col>
                        <Space wrap>
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
                        </Space>

                    </Col>
                    <Col>

                    </Col>
                    <Col>

                    </Col>
                </Row>
            </List.Item >
        </Card>
    )
}

export default EventItem