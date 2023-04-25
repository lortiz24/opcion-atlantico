import React, { useEffect, useState } from 'react'
import { Transfer, TransferProps } from 'antd'

interface IMyTransferComponentProps<T> extends TransferProps<T> {
    onSetTargetKey: (targetKey: string[]) => void,
    data: T[],
    selectedRowKey: (record: T) => string;
}


export const filterOption = (inputValue: string, option: any) => {
    return option.displayName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
}

const MyTransferComponent = <T,>({ data, targetKeys, onSetTargetKey, selectedRowKey }: IMyTransferComponentProps<T>) => {
    const [attendeesKeyTarget, setAttendeesKeyTarget] = useState<string[]>([]);
    const [selectedAttendesKeys, setSelectedAttendeesKey] = useState<string[]>([]);

    const onChange = (nextAttendeeKeyTarget: string[]) => {
        setAttendeesKeyTarget(nextAttendeeKeyTarget);
        onSetTargetKey(nextAttendeeKeyTarget)
    };


    const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedAttendeesKey([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    useEffect(() => {
    }, [])

    return (
        <Transfer
            rowKey={selectedRowKey}
            listStyle={{ width: 500 }}
            filterOption={filterOption}
            showSearch
            dataSource={data}
            locale={{
                itemUnit: 'Participante', itemsUnit: 'Participantes', notFoundContent: 'La lista está vacía', searchPlaceholder: 'Buscar persona'
            }}
            titles={['Disponibles', 'Asignados']}
            targetKeys={attendeesKeyTarget}
            selectedKeys={selectedAttendesKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            render={(item) => item.displayName}
            oneWay={true}
            showSelectAll={false}
        />
    )
}

export default MyTransferComponent