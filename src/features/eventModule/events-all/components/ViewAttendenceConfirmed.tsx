import React, { useEffect, useRef, useState } from 'react';
import { Input, InputRef, Modal, Table } from 'antd';
import { useAppSelector } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import { onCancelViewAttendance } from '../../../../store/show-events/ShowEventSlice';
import useGetUsersAttendanceByEventId from '../../../../hooks/useGetUsersAttendanceByEventId';
import { DispatchMessageService } from '../../../../components/message-response/DispatchMessageService';
import { ColumnsType } from 'antd/es/table';
import useGetMonitorSize from '../../../../hooks/useGetMonitorSize';
import useGetValueParametro from '../../../../hooks/useGetValueParametro';

interface DataType {
	key: string;
	name: string;
	promocion: number;
	city: string;
	email: string;
}

const ViewAttendenceConfirmed = () => {
	const { isViewAttendence, eventId } = useAppSelector(
		selector => selector.showEvents
	);
	const [searchText, setSearchText] = useState('');
	const dispatch = useDispatch();
	const { error, isLoading, userAttendance } =
		useGetUsersAttendanceByEventId(eventId);
	const { isTable } = useGetMonitorSize();
	const { parametre } = useGetValueParametro({ parameter: 'promociones' });

	const searchInputRef = useRef<InputRef>({} as InputRef);

	useEffect(() => {
		if (searchInputRef.current) searchInputRef.current.focus();
	}, []);

	const columns: ColumnsType<DataType> = [
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
			render: text => text,
		},
		{
			title: 'Promocion',
			dataIndex: 'promocion',
			key: 'promocion',
			sorter: (a, b) => a.promocion - b.promocion,
			filterMode: 'tree',
			filterSearch: true,
			onFilter: (value: string | number | boolean, record) =>
				record.promocion === value,
			filters: parametre?.map(parameter => ({
				text: parseInt(parameter.value),
				value: parseInt(parameter.value),
			})),
		},
	];

	if (error) {
		dispatch(onCancelViewAttendance());
		DispatchMessageService({
			action: 'show',
			type: 'error',
			msj: 'Ubo un error obteniendo los asistentes, intentelo de nuevo',
		});
	}
	return (
		<Modal
			title='Personas que asistieron'
			width={isTable ? '100%' : '50%'}
			open={isViewAttendence}
			destroyOnClose
			onCancel={() => dispatch(onCancelViewAttendance())}
			onOk={() => dispatch(onCancelViewAttendance())}
		>
			<Input.Search
				ref={searchInputRef}
				placeholder='Buscar usuario'
				onChange={e => setSearchText(e.target.value)}
				style={{ marginBottom: '16px' }}
			/>
			<Table
				scroll={{ x: 10 }}
				loading={isLoading}
				dataSource={
					userAttendance
						?.map(assistan => ({
							key: assistan.id,
							name: assistan.displayName,
							promocion: assistan.promocion,
							city: assistan.city,
							email: assistan.email,
						}))
						.filter(userInfo => {
							if (searchText.length > 0)
								return userInfo.name
									.toLowerCase()
									.startsWith(searchText.toLowerCase());
							return true;
						}) as DataType[]
				}
				columns={columns}
			/>
		</Modal>
	);
};

export default ViewAttendenceConfirmed;
