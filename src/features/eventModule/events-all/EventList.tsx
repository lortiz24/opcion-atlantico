import React, { useState } from 'react';
import { Checkbox, Collapse, Input, List, theme } from 'antd';
import EventItem from './EventItem';
import { IEvent } from '../../../interfaces/events-interfaces';
import { CaretRightOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../store/store';

export interface IEventListProps {
	eventList: IEvent[];
	isLoading?: boolean;
	typeView: 'gestion' | 'event-all' | 'initial';
}

const EventList = ({ eventList, isLoading, typeView }: IEventListProps) => {
	const [searchText, setSearchText] = useState('');
	const { token } = theme.useToken();
	const [moderator, setmoderator] = useState(false)
	const [invitado, setinvitado] = useState(false)
	const { uid } = useAppSelector(sel => sel.auth)
	const panelStyle = {
		marginBottom: 24,
		background: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		border: 'none',
	};
	return (
		<>
			<Input.Search
				placeholder="Buscar evento"
				onChange={e => setSearchText(e.target.value)}
				style={{ marginBottom: '16px' }}
			/>
			<Collapse
				bordered={false}
				expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
				style={{ background: token.colorBgContainer }}
			>
				<Collapse.Panel header="Filtros" key="1" style={panelStyle}>
					<p>Mi rol</p>
					<Checkbox.Group options={[
						{
							label: 'Soy moderador',
							value: 'soy-moderador',
							onChange: (e) => setmoderator(e.target.checked)
						},
						{
							label: 'Soy invitado',
							value: 'soy-invitado',
							onChange: (e) => setinvitado(e.target.checked)
						},
					]} />
					<p>Tipo de asistencia</p>
					<Checkbox.Group  options={[
						{
							label: 'Libre',
							value: 'free',
							onChange: (e) => setmoderator(e.target.checked)
						},
						{
							label: 'Invitacion',
							value: 'invitation',
							onChange: (e) => setinvitado(e.target.checked)
						},
					]} />
					<p>Estado de mi asistencia</p>
					<Checkbox.Group options={[
						{
							label: 'Asistencia',
							value: 'attendance',
							onChange: (e) => setmoderator(e.target.checked)
						},
						{
							label: 'No asistencia',
							value: 'invitation',
							onChange: (e) => setinvitado(e.target.checked)
						},
					]} />
				</Collapse.Panel>

			</Collapse>
			<List
				pagination={{
					position: 'both',
					align: 'end',
					pageSize: 6,
					style: { marginTop: '16px', marginBottom: '16px' },
				}}
				grid={{
					gutter: 8,
					xs: 1,
					sm: 1,
					md: 1,
					lg: 1,
					xl: 2,
					xxl: 2,
				}}
				loading={isLoading}
				dataSource={eventList.filter(event => {
					let filtro = true

					if (searchText)
						filtro = event.title.toLowerCase().includes(searchText.toLowerCase())
					if (!filtro) return filtro

					if (moderator)
						filtro = event.moderators.includes(uid as string)
					if (!filtro) return filtro

					if (invitado)
						filtro = event.assistants.includes(uid as string)
					if (!filtro) return filtro

					return filtro
				})}
				renderItem={eventItem => (
					<EventItem
						key={eventItem.title}
						eventItem={eventItem}
						typeView={typeView}
					/>
				)}
			/>
		</>
	);
};

export default EventList;
