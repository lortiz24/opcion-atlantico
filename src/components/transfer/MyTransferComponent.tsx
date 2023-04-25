import React, { useEffect, useState } from 'react'
import { Form, Transfer, TransferProps } from 'antd'
import { TransferItem } from 'antd/es/transfer';

interface IMyTransferComponentProps<T extends TransferItem> extends TransferProps<T>{
    onSetTargetKey: (selectedDataList: T[]) => void,
    data: T[],
    selectedRowKey: (record: T) => string;
    propertyRender: (record: T) => string;
}


export const filterOption = (inputValue: string, option: any) => {
    return option.displayName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
}

const MyTransferComponent = <T extends TransferItem,>({ data, targetKeys, onSetTargetKey, selectedRowKey, propertyRender }: IMyTransferComponentProps<T>) => {
    const [attendeesKeyTarget, setAttendeesKeyTarget] = useState<string[]>([]);
    const [selectedAttendesKeys, setSelectedAttendeesKey] = useState<string[]>([]);

    const onChange = (nextAttendeeKeyTarget: string[]) => {
        setAttendeesKeyTarget(nextAttendeeKeyTarget);
        onSetTargetKey(data.filter((item) => nextAttendeeKeyTarget.includes(selectedRowKey(item))));
    };


    const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedAttendeesKey([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    useEffect(() => {
    }, [])

    return (
        <Form.Item label='Asistentes' name={'assistants'} >
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
                render={propertyRender}
                oneWay={true}
                showSelectAll={false}
            />
        </Form.Item>
    )
}

export default MyTransferComponent