import React from 'react';
import { useAppSelector } from '../../store/store';
import { Avatar, Button, Form, Input, Row, Col ,Typography} from 'antd';
import { EnvironmentOutlined, HomeOutlined, MailOutlined, TagsOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
const { Title } = Typography;
const MyProfileView = () => {
	const { displayName, photoURL, uid, email, userInfo } = useAppSelector(
		selector => selector.auth
	);
	return (
        <Row justify='center' style={{ marginTop: '3%' }}>
        <Col xs={22} md={12} lg={8}>
            <Row justify='center'>
                <Title level={1}>Editar Perfil</Title>
            </Row>
            <Row justify='center' style={{ marginBottom: '3%' }}>
                <Avatar
                    size={150}
                    src='https://i.pinimg.com/236x/38/3d/dc/383ddce37a5f0e2017736f5ba2d49ea6.jpg'
                />
            </Row>
        </Col>
        <Col xs={22} md={12} lg={8} style={{ marginRight: '50px' }}>
            <Form onFinish={() => {}}>
                <Form.Item
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese su nombre completo',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder='Nombre completo' />
                </Form.Item>
                <Form.Item
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese su correo electrónico',
                        },
                        {
                            type: 'email',
                            message: 'Ingrese un correo electrónico válido',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined/> } disabled />
                </Form.Item>
                <Form.Item name='municipio'>
                    <Input prefix={<EnvironmentOutlined />} placeholder='Municipio' />
                </Form.Item>
                <Form.Item name='direccion'>
                    <Input prefix={<HomeOutlined />} placeholder='Dirección' />
                </Form.Item>
                <Form.Item name='rol'>
                    <Input prefix={<TeamOutlined />} placeholder='Rol' />
                </Form.Item>
                <Form.Item name='promocion'>
                    <Input prefix={<TagsOutlined />} placeholder='Promoción' />
                </Form.Item>
                <Form.Item>
                    <Row justify='end'>
                        <Button type='primary' htmlType='submit'>
                            Guardar
                        </Button>
                    </Row>
                </Form.Item>
            </Form>
        </Col>
    </Row>
	);
};

export default MyProfileView;
