import React, { useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, MenuProps, Row, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './MainLayout.style.css'
import { LayoutCss } from './MainLayout.style';
import { getModules } from '../store/slices/menus/thunks';
import { useAppDispatch, useAppSelector } from '../store/store';
import { SlicesRedux } from '../store/slices/ProviderSlices';
import InternetConnectionAlert from '../components/internet-conection-alert/InternetConectionAlert';
import { useNavigate } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoading, modules } = useAppSelector(SlicesRedux.selectMenus)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getModules())
  }, [])

  if (isLoading) {
    return (<>Esta cargando......</>)
  }
  if (modules.length === 0) return <>No hay modules</>
  return (
    <Layout style={LayoutCss}>
      <InternetConnectionAlert />
      <Header className="header" >
        <Row justify={'end'} style={{ width: '100%', margin: 10 }} >
          <Button type="primary">Iniciar sesión</Button>
        </Row>
        {/* <Menu mode="horizontal">
          <Menu.Item key="login" style={{ float: 'right' }}>
            <Row justify={'end'} style={{ width: '100%', margin: 10 }} >
              <Button type="primary">Iniciar sesión</Button>
            </Row>
          </Menu.Item>
        </Menu> */}
      </Header>
      <Layout>
        <Sider width={200} >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={modules.map(
              (module, index) => {
                const key = String(index + 1);
                return {
                  key: `module${key}`,
                  label: module.label,
                  children: module.children.map((children, indexChildren) => {
                    const subKey = index * 4 + indexChildren + 1;
                    console.log(subKey)
                    return {
                      key: subKey,
                      label: children.label,
                      onClick: () => navigate(children.path)
                    }
                  })
                };
              },
            )}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;