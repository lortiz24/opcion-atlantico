import React, { useEffect, useState } from 'react'
import { Form, Transfer, TransferProps } from 'antd'
import { TransferItem } from 'antd/es/transfer';
import { NamePath } from 'antd/es/form/interface';
import { Rule } from 'antd/es/form';

interface IMyTransferComponentProps<T extends TransferItem> extends TransferProps<T> {
    onSetTargetKey?: (selectedDataList: T[]) => void,
    data: T[],
    selectedRowKey: (record: T) => string;
    propertyRender: (record: T) => string;
    label?: React.ReactNode;
    name?: NamePath;
    rules?: Rule[];
}


export const filterOption = (inputValue: string, option: any) => {
    return option.displayName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
}

const MyTransferComponent = <T extends TransferItem,>({ data, targetKeys, onSetTargetKey, selectedRowKey, propertyRender, label, name, locale, rules, disabled }: IMyTransferComponentProps<T>) => {
    const [attendeesKeyTarget, setAttendeesKeyTarget] = useState<string[]>([]);
    const [selectedAttendesKeys, setSelectedAttendeesKey] = useState<string[]>([]);

    const onChange = (nextAttendeeKeyTarget: string[]) => {
        setAttendeesKeyTarget(nextAttendeeKeyTarget);
        if (onSetTargetKey) onSetTargetKey(data.filter((item) => nextAttendeeKeyTarget.includes(selectedRowKey(item))));
    };


    const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedAttendeesKey([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    useEffect(() => {
        if (targetKeys) setAttendeesKeyTarget(targetKeys)
    }, [])
    //todo: poner la regla bien ya que si vien target key del editar y no lo tocas te salta la regla
    return (
        <Form.Item
            label={label}
            name={name}
            rules={rules}
        >
            <Transfer
                disabled={disabled}
                rowKey={selectedRowKey}
                listStyle={{ width: 500 }}
                filterOption={filterOption}
                showSearch
                dataSource={data}
                locale={locale}
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