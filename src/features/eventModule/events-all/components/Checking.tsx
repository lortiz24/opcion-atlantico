import { Button, Modal, ModalProps, Popconfirm, Space, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { eventController } from '../../../../controllers/events/event.controller'
import { IUserInfo } from '../../../../interfaces/user-interfaces'
import { ColumnsType } from 'antd/es/table'
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import useListeningUsersCheckedByEvent from '../../../../hooks/useListeningUsersCheckedByEvent'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { onCancelCheking } from '../../../../store/show-events/ShowEventSlice'
import { userInfoController } from '../../../../controllers/userInfo/user-info.controller'
import useGetValueParametro from '../../../../hooks/useGetValueParametro'
import { ColumnFilterItem } from 'antd/es/table/interface'

interface ICheckingProps extends ModalProps {
    isChecking: boolean
}

interface DataType {
    key: string;
    name: string;
    promocion: number
    check: boolean
}

const abecedario: ColumnFilterItem[] = [
    { value: 'A', text: 'A' },
    { value: 'B', text: 'B' },
    { value: 'C', text: 'C' },
    { value: 'D', text: 'D' },
    { value: 'E', text: 'E' },
    { value: 'F', text: 'F' },
    { value: 'G', text: 'G' },
    { value: 'H', text: 'H' },
    { value: 'I', text: 'I' },
    { value: 'J', text: 'J' },
    { value: 'K', text: 'K' },
    { value: 'L', text: 'L' },
    { value: 'M', text: 'M' },
    { value: 'N', text: 'N' },
    { value: 'Ñ', text: 'Ñ' },
    { value: 'O', text: 'O' },
    { value: 'P', text: 'P' },
    { value: 'Q', text: 'Q' },
    { value: 'R', text: 'R' },
    { value: 'S', text: 'S' },
    { value: 'T', text: 'T' },
    { value: 'U', text: 'U' },
    { value: 'V', text: 'V' },
    { value: 'W', text: 'W' },
    { value: 'X', text: 'X' },
    { value: 'Y', text: 'Y' },
    { value: 'Z', text: 'Z' }
];



const Checking = () => {
    const { eventId, isCheckinManualOpen, event } = useAppSelector(selector => selector.showEvents)
    const [confirmados, setconfirmados] = useState<string[]>([])
    const [usersAsistentesInfo, setusersAsistentesInfo] = useState<IUserInfo[]>([])
    const { userInfoCheck, loading } = useListeningUsersCheckedByEvent({ eventId: eventId ?? '' })
    const dispatch = useAppDispatch()
    const { parametre } = useGetValueParametro({ parameter: 'promociones' })

    const columns: ColumnsType<DataType> = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text) => text,
        },
        {
            title: 'Promocion',
            dataIndex: 'promocion',
            key: 'promocion',
            sorter: (a, b) => a.promocion - b.promocion,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: string | number | boolean, record) => record.promocion === value,
            filters: parametre?.map(parameter => ({
                text: parseInt(parameter.value),
                value: parseInt(parameter.value),
            }))
        },
    ];



    useEffect(() => {
        if (event?.typeAttendance === 'hybrid' || event?.typeAttendance === 'free') {
            userInfoController.getUsersInfos()
                .then(users => {
                    setusersAsistentesInfo(users as IUserInfo[])
                })
        }
        else {
            eventController.getUsersInfoAttendanceByEventId(eventId ?? '')
                .then(item => {
                    setusersAsistentesInfo(item as IUserInfo[])
                })
        }
    }, [])
    const onDeleteCheck = async (userId: string) => {
        await eventController.deleteCheck(userId, eventId ?? '')
    }

    const onChek = async (userId: string) => {
        await eventController.createCheck(userId, eventId ?? '')
    }


    useEffect(() => {

        const idUsersInfoCheck = userInfoCheck.map(asistenteConfirmado => asistenteConfirmado.id)

        setconfirmados(idUsersInfoCheck)

    }, [userInfoCheck])

    return (
        <Modal
            open={isCheckinManualOpen}
            destroyOnClose
            onCancel={() => dispatch(onCancelCheking())}
            onOk={() => dispatch(onCancelCheking())}>

            <Table
                loading={loading}
                dataSource={usersAsistentesInfo.map(assistan => ({ key: assistan.id, name: assistan.displayName, promocion: assistan.promocion, check: confirmados.includes(assistan.id) })) as DataType[]}
                columns={[...columns, {
                    title: 'Acciones',
                    dataIndex: 'check',
                    key: 'check',
                    render: (check: boolean, record) => (
                        <Space size="middle">
                            {
                                check ? (
                                    <Tooltip placement="right" title={'Eliminar asistencia'} >
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
                                    <Tooltip placement="right" title={'Marcar asistencia'} >
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