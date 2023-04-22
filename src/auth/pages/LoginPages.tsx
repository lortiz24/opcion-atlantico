import React, { useMemo } from "react";
import { Form, Input, Button, Card, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./css/Login-css.css";
import opcion_logo from '../../assets/Logo Opcion Atlantico 2022.svg';
import Title from "antd/es/typography/Title";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { startLoginWithEmailPassword } from "../../store/auth";
import LoadingComponent from "../../components/loading/LoadingComponent";
import { useNavigate } from "react-router-dom";

const LoginPages = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selector => selector.auth)
  const navigate = useNavigate()

  // if (status === 'checking') return <LoadingComponent isLoading={status === 'checking'} />

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  return (
    <div className="login-page-container">
      <div className="container-left">
        <div className="login-card-container">
          <Card className="login-card">
            <div className="card-logo-container">
              <img src={opcion_logo} height={300} alt="Logo" className="card-logo" />
            </div>
            <Title level={2} style={{ color: '#1f3f50', fontWeight: 'bold', marginBottom: '20px' }}>Iniciar Sesión</Title>
            <Form
              name="login-form"
              initialValues={{ remember: true }}
              onFinish={(values) => dispatch(startLoginWithEmailPassword({ email: values.email, password: values.password }))}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Por favor ingresa tu nombre de usuario!" }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre de usuario" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Por favor ingresa tu contraseña!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Contraseña"
                />
              </Form.Item>
              <Form.Item>
                <Row justify={'center'} gutter={[8, 8]}>
                  <Col>
                    <Button type="primary" disabled={isAuthenticating} htmlType="submit" className="login-form-button">
                      Iniciar sesión
                    </Button>
                  </Col>
                  <Col>
                    <Button type="dashed" className="login-form-button" onClick={() => navigate('/register')}>
                      Registrarse
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
      <div className="background-image-container"></div>
    </div>
  );
};

export default LoginPages;
