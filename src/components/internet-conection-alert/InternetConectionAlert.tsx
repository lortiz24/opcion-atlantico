import React, { useEffect, useState } from 'react';
import { Alert, Col, Row, Space, Typography } from 'antd';
import controllerInternetConnection from '../../utils/internet-conection-alert/controllerInternetConnection';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setStatusConection } from '../../store/slices/status-conection/statusConectionSlice';

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

const InternetConnectionAlert = ({
	description,
	placement = 'bottom',
	action,
}: propsOptions) => {
	const { statusConection } = useAppSelector((selector)=>{
    return selector.statusConection
  });
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (statusConection === 'initial') return;
		if (statusConection === 'conection') {
			setTimeout(() => {
				dispatch(setStatusConection({ statusConection: 'initial' }));
			}, 3500);
		}
	}, [statusConection]);
	if (statusConection === 'initial') return<></>
	return (
		<>
			<>
				{statusConection === 'conection' ? (
					<Alert
						key={'success'}
						className='animate__animated animate__fadeInDown'
						style={placement === 'top' ? positionTop : positionBotton}
						message={
							<Space>
								<Typography.Text>
									Conexión a internet restablecida.
								</Typography.Text>{' '}
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
		</>
	);
};

export default InternetConnectionAlert;
