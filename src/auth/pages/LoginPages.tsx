import React from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./css/Login-css.css";

const LoginPages = () => {
  return (
    <div className="login-page-container">
      <div className="container-left">
        <div className="login-card-container">
          <Card className="login-card">
            <h2 className="login-title">Iniciar Sesión</h2>
            <Form
              name="login-form"
              initialValues={{ remember: true }}
              onFinish={() => { }}
              onFinishFailed={() => { }}
            >
              <Form.Item
                name="username"
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
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Iniciar sesión
                </Button>
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
