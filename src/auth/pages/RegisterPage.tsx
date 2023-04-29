import React, { useMemo } from 'react';
import { Form, Input, Button, Card, Row, Col, Layout, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './css/Login-css.css';
import opcion_logo from '../../assets/Logo Opcion Atlantico 2022.svg';
import Title from 'antd/es/typography/Title';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { startCreatingUserWithEmailPassword, startLoginWithEmailPassword } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { LayoutCss } from '../../layouts/MainLayout.style';
import useGetValueParametro from '../../hooks/useGetValueParametro';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selector => selector.auth);
  const { isLoading, parametre } = useGetValueParametro({ parameter: 'promociones' })
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const navigate = useNavigate()
  return (
    <Layout className='login-page-container' style={LayoutCss}>
      <div className='container-left'>
        <div className='login-card-container'>
          <Card className='login-card'>
            <Row justify={'center'}>
              <Col>
                <img
                  src={opcion_logo}
                  height={300}
                  alt='Logo'
                  className='card-logo'
                />
              </Col>
              <Col>
                <Title
                  level={2}
                  style={{
                    color: '#1f3f50',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                  }}
                >
                  Registro de usuario
                </Title>
                <Form
                  name='login-form'
                  initialValues={{ remember: true }}
                  onFinish={values => {
                    dispatch(
                      startCreatingUserWithEmailPassword({
                        email: values.email,
                        password: values.password,
                        displayName: values.displayName,
                        promocion: values.promocion
                      })
                    )
                  }
                  }
                >
                  <Form.Item
                    name='displayName'
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa tu nombre de usuario!',
                      }
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className='site-form-item-icon' />}
                      placeholder='Nombre de usuario'
                    />
                  </Form.Item>
                  <Form.Item
                    name='promocion'
                    rules={[
                      {
                        required: true,
                        message: 'Por favor escoge tu promocion!',
                      }
                    ]}
                  >
                    <Select
                      placeholder='Promocion'
                      options={parametre?.map(item => ({ label: `Promocion ${item.value}`, value: item.value }))}
                    />
                  </Form.Item>
                  <Form.Item
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa tu correo electronico!',
                      },
                      {
                        type: 'email',
                        message: '¡El correo electrónico no es válido!',
                      }
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className='site-form-item-icon' />}
                      placeholder='Correo electronico'
                    />
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa tu contraseña!',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className='site-form-item-icon' />}
                      type='password'
                      placeholder='Contraseña'
                    />
                  </Form.Item>

                  <Form.Item
                    name="passwordConfirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: '¡Por favor, confirma tu contraseña!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('¡Las contraseñas no coinciden!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className='site-form-item-icon' />}
                      placeholder='Confirmar contraseña' />
                  </Form.Item>


                  <Form.Item>
                    <Row justify={'center'} gutter={[8, 8]}>
                      <Col>
                        <Button
                          type='primary'
                          disabled={isAuthenticating}
                          htmlType='submit'
                          className='login-form-button'
                        >
                          Registrarse
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          type='dashed'
                          className='login-form-button'
                          onClick={() => navigate('/auth/login')}
                        >
                          Ya tengo una cuenta
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      <div className='background-image-container'></div>
    </Layout>
  );
};

export default RegisterPage;
