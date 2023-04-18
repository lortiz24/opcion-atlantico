import React, { useEffect, useState } from 'react';
import { Alert, Space, Typography } from 'antd';
import controllerInternetConnection from '../../utils/internet-conection-alert/controllerInternetConnection';

interface propsOptions {
  description?: string | React.ReactNode;
  placement?: 'top' | 'bottom';
  action?: React.ReactNode;
}

const positionTop: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  width: '100vw',
  zIndex: '2000',
  textAlign: 'center',
};

const positionBotton: React.CSSProperties = {
  position: 'fixed',
  bottom: '0',
  width: '100vw',
  zIndex: '2000',
  textAlign: 'center',
};

const InternetConnectionAlert = ({ description, placement = 'top', action }: propsOptions) => {
  const [connectionStatus, setConnectionStatus] = useState<boolean | string>('initial');

  controllerInternetConnection({ setConnectionStatus });

  useEffect(() => {
    if (connectionStatus === 'initial') return;
    if (connectionStatus === true) {
      setTimeout(() => {
        setConnectionStatus('initial');
      }, 3500);
    }
  }, [connectionStatus]);

  return (
    <>
      {typeof connectionStatus === 'boolean' && (
        <>
          {connectionStatus ? (
            <Alert
              key={'success'}
              className='animate__animated animate__fadeInDown'
              style={placement === 'top' ? positionTop : positionBotton}
              message={
                <Space>
                  <Typography.Text>Conexión a internet restablecida.</Typography.Text>{' '}
                </Space>
              }
              type='success'
              description={description}
              action={action}
            />
          ) : (
            <Alert
              key={'warning'}
              className='animate__animated animate__fadeInDown'
              style={placement === 'top' ? positionTop : positionBotton}
              message={
                <Space>
                  <Typography.Text>Conexión a internet perdida.</Typography.Text>{' '}
                </Space>
              }
              type='error'
              description={description}
              action={action}
            />
          )}
        </>
      )}
    </>
  );
};

export default InternetConnectionAlert;
