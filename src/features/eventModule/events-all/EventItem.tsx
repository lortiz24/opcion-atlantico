import { QrcodeOutlined, ScanOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Image, List, Result, Row, Space, Statistic, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { IEvent } from '../../../interfaces/events-interfaces';
import { IEventListProps } from './EventList';
import useGetMonitorSize from '../../../hooks/useGetMonitorSize';
import { timestampAfterNow, timestampBeforeNow, timestampToString } from '../../../services/date-treatment/conversions-date.utils';
import { ResultStatusType } from 'antd/es/result';


const { Countdown } = Statistic;
interface IEventItemProps extends IEventListProps {
    eventItem: IEvent
}


const IconText = ({ icon, text, onClick }: { icon: React.FC; text: string, onClick: () => void }) => (
    <Space style={{ cursor: 'pointer' }} onClick={onClick}>
        {React.createElement(icon)}
        {text}
    </Space>
);

const EventItem = ({ eventItem, onGenerateQR, onReadQr }: IEventItemProps) => {
    const { width } = useGetMonitorSize()
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
            /*  actions={[
                 <IconText onClick={() => onGenerateQR(eventItem.id)} icon={QrcodeOutlined} text="Generar QR" key="list-vertical-message" />,
                 <IconText onClick={() => onReadQr()} icon={ScanOutlined} text="Marcar asistencia" key="list-vertical-message" />,
             ]} */
            extra={
                width > 700 ? (
                    <Image
                        width={272}
                        src={eventItem.img}
                        alt="logo"
                        preview={false}
                        style={{ borderRadius: 20 }}
                    />
                ) : <></>
            }

        >
            <Card bordered={false} style={{ backgroundColor: 'transparent' }} bodyStyle={{ padding: '5px' }}>
                <Result
                    style={{ paddingTop: '2px', paddingBottom: '20px' }}
                    status={statusResult}
                    title={messageByState}
                    extra={
                        statusResult === 'info' && (
                            <Countdown
                                style={{ margin: 'auto' }}
                                value={timestampToString(eventItem.dateStart, 'MM/DD/YYYY hh:mm A')}
                                format='D [días] H [horas] m [minutos] s [segundos]'
                            />
                        )
                    }
                />
                <Row justify='center' align='middle' gutter={[16, 16]} wrap>
                    <Col>
                        <Space wrap>
                            <Typography.Text strong>Fecha incio:</Typography.Text>
                            <Typography.Text code>{timestampToString(eventItem.dateStart, 'DD-MM-YYYY hh:mm A')}</Typography.Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space wrap>
                            <Typography.Text strong>Fecha fin: </Typography.Text>
                            <Typography.Text code>{timestampToString(eventItem.dateEnd, 'DD-MM-YYYY hh:mm A')}</Typography.Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space wrap>
                            <Typography.Text strong>Lugar: </Typography.Text>
                            <Typography.Text code style={{ textTransform: 'uppercase' }}>
                                {eventItem.place}
                            </Typography.Text>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space wrap>
                            <IconText onClick={() => onGenerateQR(eventItem.id)} icon={QrcodeOutlined} text="Generar QR" />
                            <IconText onClick={() => onReadQr()} icon={ScanOutlined} text="Marcar asistencia" />
                        </Space>
                    </Col>
                </Row>
            </Card>
        </List.Item >
    )
}

export default EventItem