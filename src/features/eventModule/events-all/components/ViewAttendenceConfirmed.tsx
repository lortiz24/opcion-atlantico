import { Modal, Table } from 'antd'
import React from 'react'
import { useAppSelector } from '../../../../store/store'
import { useDispatch } from 'react-redux'
import { onCancelViewAttendance } from '../../../../store/show-events/ShowEventSlice'
import useGetUsersAttendanceByEventId from '../../../../hooks/useGetUsersAttendanceByEventId'
import { DispatchMessageService } from '../../../../components/message-response/DispatchMessageService'
import { ColumnsType } from 'antd/es/table'
import useGetMonitorSize from '../../../../hooks/useGetMonitorSize'



interface DataType {
    key: string;
    name: string;
    promocion: string
    city: string;
    email: string;
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
    {
        title: 'Ciudad',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: 'Correo electrónico',
        dataIndex: 'email',
        key: 'email',
    },



];

const ViewAttendenceConfirmed = () => {
    const { isViewAttendence, eventId } = useAppSelector(selector => selector.showEvents)
    const dispatch = useDispatch()
    const { error, isLoading, userAttendance } = useGetUsersAttendanceByEventId(eventId)
    const { isMobile, isTable, windowSize } = useGetMonitorSize()

    if (error) {
        dispatch(onCancelViewAttendance())
        DispatchMessageService({ action: 'show', type: 'error', msj: 'Ubo un error obteniendo los asistentes, intentelo de nuevo' })
    }
    return (
        <Modal
            width={isTable ? '100%' : '50%'}
            open={isViewAttendence}
            destroyOnClose
            onCancel={() => dispatch(onCancelViewAttendance())}
            onOk={() => dispatch(onCancelViewAttendance())}>

            <Table
                scroll={{ x: 10 }}
                loading={isLoading}
                dataSource={userAttendance?.map(assistan => ({ key: assistan.id, name: assistan.displayName, promocion: assistan.promocion, city: assistan.city, email: assistan.email })) as DataType[]}
                columns={columns}
            />

        </Modal>
    )
}

export default ViewAttendenceConfirmed