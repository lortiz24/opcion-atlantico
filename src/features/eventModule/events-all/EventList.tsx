import React from 'react';
import { List, Pagination } from 'antd';
import EventItem from './EventItem';
import { IEvent } from '../../../interfaces/events-interfaces';

export interface IEventListProps {
	eventList: IEvent[];
	isLoading?: boolean;
	typeView: 'gestion' | 'event-all' | 'initial';
}

const EventList = ({ eventList, isLoading, typeView }: IEventListProps) => {
	// TODO: realziar paginacions
	return (
		<>
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
				dataSource={eventList}
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
