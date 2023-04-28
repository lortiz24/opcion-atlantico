import { Button, Modal, ModalProps, Popconfirm, Space, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { eventController } from '../../../../controllers/events/event.controller'
import { useAppSelector } from '../../../../store/store'
import useGetEventById from '../../../../hooks/useGetEventById'
import { IUserInfo } from '../../../../interfaces/user-interfaces'
import { ColumnsType } from 'antd/es/table'
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons'

interface ICheckingProps extends ModalProps {
    isChecking: boolean
    eventId: string
}



interface DataType {
    key: string;
    name: string;
    promocion: string
    check: boolean
}


const columns: ColumnsType<DataType> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        render: (text) => text
    },
    {
        title: 'Promocion',
        dataIndex: 'promocion',
        key: 'promocion',
    },

];





const Checking = ({ isChecking, onCancel, onOk, eventId }: ICheckingProps) => {
    const { event } = useGetEventById(eventId)
    const [confirmados, setconfirmados] = useState<string[]>([])
    const [noConfirmados, setNoConfirmados] = useState<string[]>([])
    const [usersAsistentesInfo, setusersAsistentesInfo] = useState<IUserInfo[]>([])
    const [isLoading, setisLoading] = useState(true)


    const epa = async () => {
        setisLoading(true)
        if (!event) return setisLoading(false)
        const asistentesConfirmados = await eventController.getUsersIdAttendanceByEventId(eventId) as string[]
        setconfirmados(asistentesConfirmados)
        const notAsistend = event.assistants.filter(asistente => !asistentesConfirmados.includes(asistente))
        setNoConfirmados(notAsistend)
        const usersInfoByEventId = await eventController.getUsersInfoAttendanceByEventId(eventId) as IUserInfo[]
        setusersAsistentesInfo(usersInfoByEventId)
        setisLoading(false)
    }

    const onDeleteCheck = async (userId: string) => {
        await eventController.deleteCheck(userId, eventId)
    }

    const onChek = async (userId: string) => {
        await eventController.createCheck(userId, eventId)
    }


    useEffect(() => {
        epa()
    }, [event])

    return (
        <Modal
            open={isChecking}
            destroyOnClose
            onCancel={onCancel}
            onOk={onOk}>

            <Table
                loading={isLoading}
                dataSource={usersAsistentesInfo.map(assistan => ({ key: assistan.id, name: assistan.displayName, promocion: assistan.promocion, check: confirmados.includes(assistan.id) })) as DataType[]}
                columns={[...columns, {
                    title: 'Acciones',
                    dataIndex: 'check',
                    key: 'check',
                    render: (check: boolean, record) => (
                        <Space size="middle">
                            {
                                check ? (
                                    <Tooltip placement="topLeft" title={'Eliminar asistencia'} >
                                        <Popconfirm
                                            placement="topRight"
                                            title={'Inactivar modulo'}
                                            description={'Esta seguro que desea quitar la asistencia de ese usuario'}
                                            onConfirm={() => onDeleteCheck(record.key)}
                                            okText="Si"
                                            cancelText="No"
                                        >
                                            <Button icon={<DeleteOutlined />}></Button>
                                        </Popconfirm>
                                    </Tooltip>

                                ) : (
                                    <Tooltip placement="topLeft" title={'Marcar asistencia'} >
                                        <Button
                                            onClick={() => onChek(record.key)}
                                            icon={<CheckOutlined />}></Button>
                                    </Tooltip>
                                )
                            }

                        </Space>
                    ),
                }]}
            />

        </Modal>
    )
}

export default Checking