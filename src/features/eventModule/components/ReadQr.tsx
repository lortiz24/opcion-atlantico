import { Button, Col, Form, Modal, ModalProps, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader';
import { FacingMode } from '../interfaces/events-interfaces';
import { CameraOutlined } from '@ant-design/icons';
interface IReadQrProps extends ModalProps {
    isReadQrOpen: boolean,
    onClose: () => void
}
const ReadQr = ({ isReadQrOpen, onClose, onOk }: IReadQrProps) => {
    const [facingMode, setFacingMode] = useState<FacingMode>('user');

    const handleError = (err: any) => {
        console.error(err);
    };

    const handleScan = (data: any) => {
        console.log(data)
    };

    return (
        <Modal
            open={isReadQrOpen}
            title={'Lector QR'}
            footer={false}
            onCancel={onClose}
            onOk={onOk}
            okText={'Guardar'}>
            <Tabs defaultValue='1' destroyInactiveTabPane={true}>
                <Tabs.TabPane
                    tab={
                        <>
                            <CameraOutlined />
                            {'Camara'}
                        </>
                    }
                    key='1'>
                    <Form.Item>
                        <Row justify='center' wrap gutter={8}>
                            <Col>
                                <Button
                                    type='primary'
                                    icon={<CameraOutlined />}
                                    onClick={() => (facingMode === 'user' ? setFacingMode('environment') : setFacingMode('user'))}>
                                    {facingMode === 'user' ? ' Front' : 'Rear'} Camera
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <QrReader
                        videoStyle={{ width: '100%' }}
                        scanDelay={1500}
                        onResult={handleScan}
                        constraints={{ facingMode: facingMode, sampleSize: 10, frameRate:10 }}
                    />
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    )
}

export default ReadQr