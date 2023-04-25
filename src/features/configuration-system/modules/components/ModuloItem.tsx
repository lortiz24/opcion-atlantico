import React from 'react'
import { Button, Modal, ModalProps, Popconfirm, Space, Table, Tag } from 'antd'
import { IChildrensModules } from '../../../../interfaces/modules-interface'
import { ColumnsType } from 'antd/es/table';
import { StatusToRenderValues } from '../interfaces/form-modules';
import { CheckOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { StatusToRender } from '../utils/status-render';
import useListeningModule from '../hooks/useListeningModule';
import { menuController } from '../../../../controllers/menu/menu.controlller';


interface DataType {
    key: string;
    name: string;
    path: string;
    status: StatusToRenderValues;
}
interface IModuloItemProps extends ModalProps {
    moduleId: string
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


const ModuloItem = ({ onCancel, onOk, moduleId, open }: IModuloItemProps) => {
    const { loading, module } = useListeningModule(moduleId)

    const onUpdateSubMenu = (record: DataType, action: 'active' | 'inactive') => {
        const newModule = { ...module }
        newModule.children = newModule.children?.map(submenu => {
            if (submenu.label === record.name) {
                return { ...submenu, status: action === 'inactive' ? 'not-avalible' : 'avalible' } as IChildrensModules
            }
            return submenu
        })
        menuController.updateMenu(moduleId, newModule)
    }
    return (
        <Modal open={open} onCancel={onCancel} onOk={onOk} destroyOnClose>
            <Table loading={loading}
                dataSource={module.children?.map(module => ({ key: module.label + module.path, name: module.label, path: `/${module.path}`, status: StatusToRender[module.status] })) as DataType[]}
                columns={[...columns, {
                    title: 'Acciones',
                    key: 'action',
                    render: (_, record) => (
                        <Space size="middle">
                            {
                                record.status === StatusToRender.avalible ? (
                                    <Popconfirm
                                        placement="topRight"
                                        title={'Inactivar modulo'}
                                        description={'Esta seguro que desea inactivar el submodulo'}
                                        onConfirm={() => onUpdateSubMenu(record, 'inactive')}
                                        okText="Si"
                                        cancelText="No"
                                    >
                                        <Button icon={<DeleteOutlined />}></Button>
                                    </Popconfirm>
                                ) : (
                                    <Popconfirm
                                        placement="topRight"
                                        title={'Activar modulo'}
                                        description={'Esta seguro que desea activar el submodulo'}
                                        onConfirm={() => onUpdateSubMenu(record, 'active')}
                                        okText="Si"
                                        cancelText="No"
                                    >
                                        <Button icon={<CheckOutlined />}></Button>
                                    </Popconfirm>
                                )
                            }

                        </Space>
                    ),
                }]}
            />
        </Modal>
    )
}

export default ModuloItem