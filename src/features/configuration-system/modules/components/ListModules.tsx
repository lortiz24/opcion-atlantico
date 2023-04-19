import React from 'react'
import { Button, Popconfirm, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch } from '../../../../store/store';
import { CheckOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { activeModule, inactiveModule } from '../../../../store/slices/menus/thunks';
import useGetModules from '../../../../hooks/useListeningModules';
import { StatusToRender } from '../utils/status-render';
import { StatusToRenderValues } from '../interfaces/form-modules';

interface DataType {
    key: string;
    name: string;
    path: string;
    status: StatusToRenderValues;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Ruta',
        dataIndex: 'path',
        key: 'age',
    },
    {
        title: 'Estado',
        key: 'status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <>
                <Tag color={status === 'Habilitada' ? 'green' : "red"}>
                    {status.toUpperCase()}
                </Tag>

            </>
        ),
    },
];


const ListModules = () => {
    const { loading, modules } = useGetModules()
    const dispatch = useAppDispatch()

    const onInactiveModule = ({ key: menuId }: DataType) => {
        dispatch(inactiveModule(menuId))
    }
    const onactiveModule = ({ key: menuId }: DataType) => {
        dispatch(activeModule(menuId))
    }

    return (
        <Table loading={loading} columns={[...columns, {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} ></Button>
                    <Button icon={<EditOutlined />}></Button>
                    {
                        record.status === StatusToRender.avalible ? (
                            <Popconfirm
                                placement="topRight"
                                title={'Inactivar modulo'}
                                description={'Esta seguro que desea inactivar el modulo'}
                                onConfirm={() => onInactiveModule(record)}
                                okText="Si"
                                cancelText="No"
                            >

                                <Button icon={<DeleteOutlined />}></Button>
                            </Popconfirm>
                        ) : (
                            <Popconfirm
                                placement="topRight"
                                title={'Activar modulo'}
                                description={'Esta seguro que desea activar el modulo'}
                                onConfirm={() => onactiveModule(record)}
                                okText="Si"
                                cancelText="No"
                            >

                                <Button icon={<CheckOutlined />}></Button>
                            </Popconfirm>
                        )
                    }

                </Space>
            ),
        }]} dataSource={modules.map(module => ({ key: module.id, name: module.label, path: `/${module.path}`, status: StatusToRender[module.status] })) as DataType[]} />
    )
}

export default ListModules