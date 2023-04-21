import { Button, Col, Form, Modal, ModalProps, Row } from 'antd';
import React, { useState } from 'react'
// @ts-ignore: Unreachable code error 
import * as QrReader from 'react-qr-reader';
import { CameraOutlined } from '@ant-design/icons';
import { FacingMode } from '../../../interfaces/events-interfaces';
interface IReadQrProps extends ModalProps {
}
const ReadQr = ({ onCancel, onOk, open }: IReadQrProps) => {
    const [facingMode, setFacingMode] = useState<FacingMode>('user');
    const handleScan = (data: string | null) => {
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
                delay={1500}
                facingMode={facingMode}
                onScan={handleScan}
                style={{
                    width: '80%',
                    marginBottom: '20px',
                }}
                onError={console.log}

            />
        </Modal>
    )
}

export default ReadQr