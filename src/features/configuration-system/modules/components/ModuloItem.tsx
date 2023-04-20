import { Button, Modal, ModalProps, Popconfirm, Space, Table, Tag } from 'antd'
import React from 'react'
import { IChildrensModules } from '../../../../interfaces/modules-interface'
import { ColumnsType } from 'antd/es/table';
import { StatusToRenderValues } from '../interfaces/form-modules';
import { CheckOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { StatusToRender } from '../utils/status-render';
import useListeningModule from '../hooks/useListeningModule';


interface DataType {
    key: string;
    name: string;
    path: string;
    status: StatusToRenderValues;
}
interface IModuloItemProps extends ModalProps {
    subModuleId: string
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
];


const ModuloItem = ({ onCancel, onOk, subModuleId, open }: IModuloItemProps) => {
    const { loading, module } = useListeningModule(subModuleId)
    if (!open) return <></>
    return (
        <Modal open={open} onCancel={onCancel} onOk={onOk} destroyOnClose>
            <Table loading={loading} columns={[...columns, {
                title: 'Acciones',
                key: 'action',
                render: (_, record) => (
                    <Space size="middle">
                        <Button icon={<EditOutlined />}></Button>
                        {
                            record.status === StatusToRender.avalible ? (
                                <Popconfirm
                                    placement="topRight"
                                    title={'Inactivar modulo'}
                                    description={'Esta seguro que desea inactivar el modulo'}
                                    // onConfirm={() => onInactiveModule(record)}
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
                                    // onConfirm={() => onactiveModule(record)}
                                    okText="Si"
                                    cancelText="No"
                                >

                                    <Button icon={<CheckOutlined />}></Button>
                                </Popconfirm>
                            )
                        }

                    </Space>
                ),
            }]} dataSource={module.children?.map(module => ({ key: module.label + module.path, name: module.label, path: `/${module.path}`, status: StatusToRender[module.status] })) as DataType[]} />
        </Modal>
    )
}

export default ModuloItem