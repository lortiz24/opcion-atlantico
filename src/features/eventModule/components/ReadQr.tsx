import { Button, Col, Form, Modal, ModalProps, Row, Tabs } from 'antd';
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';
import { CameraOutlined } from '@ant-design/icons';
import { FacingMode } from '../../../interfaces/events-interfaces';
interface IReadQrProps extends ModalProps {
}
const ReadQr = ({ onCancel, onOk, open }: IReadQrProps) => {
    const [facingMode, setFacingMode] = useState<FacingMode>('user');
    const handleScan = (data: any) => {
        console.log(data)
    };

    return (
        <Modal
            open={open}
            destroyOnClose
            title={'Lector QR'}
            footer={false}
            onCancel={onCancel}
            onOk={onOk}
            okText={'Guardar'}>
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
                constraints={{ facingMode: facingMode, sampleSize: 10, frameRate: 10, autoGainControl: true }}
            />
        </Modal>
    )
}

export default ReadQr