import React, { useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, MenuProps, Row, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './MainLayout.style.css'
import { LayoutCss } from './MainLayout.style';
import { getModules } from '../store/slices/menus/thunks';
import { useAppDispatch, useAppSelector } from '../store/store';
import InternetConnectionAlert from '../components/internet-conection-alert/InternetConectionAlert';
import { useNavigate } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoading, modules } = useAppSelector(selector =>selector.menu)
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
      <Header className="header" style={{background:'#E50053'}}>
        <Row justify={'end'} style={{ width: '100%', margin: 10 }} >
          <Button type="text" >Iniciar sesión</Button>
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
                let newModule:any = {
                  key: `module${key}`,
                  label: module.label,
                  children: module.children?.map((children, indexChildren) => {
                    const subKey = index * 4 + indexChildren + 1;
                    return {
                      key: subKey,
                      label: children.label,
                      onClick: () => navigate(children.path)
                    }
                  })
                }
                if(!module.children)newModule.onClick=() => navigate(module.path)
                return newModule;
              },
            )}
          />
        </Sider>
        <Layout style={{ padding: '24px 24px 24px' }}>
          
          <Content
            style={{
              paddingLeft: 24,
              paddingRight:24,
              paddingTop:15,
              paddingBottom:50,
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