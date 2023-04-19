import React, { useEffect, useState } from 'react';
import * as IconsAntDesing from '@ant-design/icons';
import { Button, Col, MenuProps, Row, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './MainLayout.style.css'
import { LayoutCss } from './MainLayout.style';
import { getModules } from '../store/slices/menus/thunks';
import { useAppDispatch, useAppSelector } from '../store/store';
import InternetConnectionAlert from '../components/internet-conection-alert/InternetConectionAlert';
import { useNavigate } from 'react-router-dom';
import { IModules } from '../interfaces/modules-interface';
import LoadingComponent from '../components/loading/LoadingComponent';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
const { Header, Content, Sider } = Layout;
const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoading, modules } = useAppSelector(selector => selector.menu)
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState<IModules[]>([])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getModules())
  }, [])

  useEffect(() => {
    const modulesEnabled = modules.filter(module => module.status !== 'not-avalible')
    setMenuList(modulesEnabled)
  }, [modules])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // if (isLoading) {
  //   return (<>Esta cargando......</>)
  // }
  // if (modules.length === 0) return <>No hay modules</>
  return (
    <>
      {isLoading ? <LoadingComponent isLoading={isLoading} />
        :
        <Layout style={LayoutCss}>
          <InternetConnectionAlert />
          <Layout>
            <Sider width={200} trigger={null} collapsible onCollapse={() => setCollapsed(!collapsed)} collapsed={collapsed}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                items={menuList.map(
                  (module, index) => {
                    const key = String(index + 1);
                    let newModule: any = {
                      key: `module${key}`,
                      label: module.label,
                      // @ts-ignore
                      icon: React.createElement(IconsAntDesing[module.icon]),
                      children: module.children?.map((children, indexChildren) => {
                        const subKey = index * 4 + indexChildren + 1;
                        return {
                          key: subKey,
                          label: children.label,
                          onClick: () => navigate(`${module.path}/${children.path}`)
                        }
                      })
                    }
                    if (!module.children) newModule.onClick = () => navigate(module.path)
                    return newModule;
                  },
                )}
              />
            </Sider>
            <Layout >
              <Header className="header" style={{ background: '#a40c4c', color: '#FFFFFF' }}>
                <Row justify={'space-between'} style={{ width: '100%' }} >
                  <Col>
                    {
                      collapsed ? <IconsAntDesing.MenuUnfoldOutlined style={{ fontSize: '24px' }} onClick={() => setCollapsed(!collapsed)} /> : <IconsAntDesing.MenuFoldOutlined style={{ fontSize: '24px' }} onClick={() => setCollapsed(!collapsed)} />
                    }
                  </Col>
                  <Col>
                    <Button type="primary" >Iniciar sesión</Button>
                  </Col>
                </Row>
              </Header>
              <Content
                style={{
                  overflow: 'auto',
                  padding: 25,
                  margin: 0,
                  minHeight: 0,
                  background: colorBgContainer,
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout >}
    </>
  );
};

export default MainLayout;