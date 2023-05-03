import React, { useState } from 'react'
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch } from '../../../../store/store';
import { CheckOutlined, DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { activeModule, inactiveModule } from '../../../../store/menus/thunks';
import { StatusToRender } from '../utils/status-render';
import { StatusToRenderValues } from '../interfaces/form-modules.interface';
import ModuloItem from './ModuloItem';
import useListeningModules from '../../../../hooks/useListeningModules';
import { openEditionMode } from '../../../../store/form-modules/formModulesSlices';

interface DataType {
    key: string;
    name: string;
    path: string;
    status: StatusToRenderValues;
    subMenus: boolean
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

const ModulesList = () => {
    const { loading, modules } = useListeningModules()
    const dispatch = useAppDispatch()
    const [showSubmodules, setShowSubmodules] = useState(false)
    const [selectedModuleId, setSelectedModuleId] = useState<string>('')
    const onInactiveModule = ({ key: menuId }: DataType) => {
        dispatch(inactiveModule(menuId))
    }
    const onactiveModule = ({ key: menuId }: DataType) => {
        dispatch(activeModule(menuId))
    }

    const onShowSubmodules = (moduleId: string) => {
        setSelectedModuleId(moduleId)
        setShowSubmodules(true)
    }

    const onCloseShowSubmodule = () => {
        setShowSubmodules(false)
    }



    return (
        <>
            {showSubmodules && <ModuloItem open={showSubmodules} onCancel={onCloseShowSubmodule} onOk={onCloseShowSubmodule} moduleId={selectedModuleId} />}
            <Table
                scroll={{ x: 10 }}
                loading={loading}
                dataSource={modules.map(module => ({ key: module.id, name: module.label, path: `/${module.path}`, status: StatusToRender[module.status], subMenus: module.children.length > 0 })) as DataType[]}
                columns={[...columns, {
                    title: 'Acciones',
                    key: 'action',
                    render: (_, record) => (
                        <Space size="middle">
                            {record.subMenus ?
                                <>
                                    <Tooltip placement="topLeft" title={'Mostrar submenus'} >
                                        <Button icon={<EyeOutlined />} onClick={() => onShowSubmodules(record.key)}></Button>
                                    </Tooltip>
                                </>
                                :
                                <>
                                    <Tooltip placement="topLeft" title={'No tiene submenus'} >
                                        <Button icon={<EyeInvisibleOutlined />} disabled></Button>
                                    </Tooltip>
                                </>}
                            <Tooltip placement="topLeft" title={'Editar el menu'} >
                                <Button icon={<EditOutlined />} onClick={() => dispatch(openEditionMode({ moduleID: record.key }))}></Button>
                            </Tooltip>
                            {
                                record.status === StatusToRender.avalible ? (
                                    <Tooltip placement="topLeft" title={'Desactivar el modulo'} >
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
                                    </Tooltip>
                                ) : (
                                    <Tooltip placement="topLeft" title={'Activar el modulo'} >
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
                                    </Tooltip>

                                )
                            }

                        </Space>
                    ),
                }]} />
        </>

    )
}

export default ModulesList