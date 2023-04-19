import { Avatar, Button, Col, List, Row, Space, Tabs, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { IEvents, IEventsRender } from './interfaces/events-interfaces'
import useGetEvents from '../../hooks/useGetEvents';
import { DeleteOutlined, EditOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { LevelTitlesModules } from '../../settings/properties-globals/levels-titles';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


const EventView = () => {
    const { events, loading } = useGetEvents()
    const [eventsRender, setEventsRender] = useState<IEventsRender[]>([])

    return (
        <>
            <Typography.Title level={LevelTitlesModules}>Eventos</Typography.Title>
            <br />
            <List
                loading={loading}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={events}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src={item.img}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar.Group maxCount={4} maxStyle={{ color: 'white', backgroundColor: '#333F44' }}>
                                {item.assistants.map((assistant, key) => (
                                    <Tooltip key={key} title={assistant.name} placement='top'>
                                        <Avatar style={{ backgroundColor: '#333F44', color: 'white' }}>
                                            {assistant.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </Tooltip>
                                ))}
                            </Avatar.Group>}
                            title={item.title}
                            description={item.date.toDate().toString()}
                        />
                        {item.desciption}
                    </List.Item>
                )}
            />

        </>
    )
}

export default EventView