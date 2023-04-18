import { TreeProps } from 'antd';
import Tree, { DataNode } from 'antd/es/tree';
import React, { Children, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../../store/store';



const ListModules = () => {
    const { modules, isLoading } = useAppSelector(selector => selector.menu)

    const [gData, setGData] = useState<DataNode[]>([]);
    useEffect(() => {
        const dataTree: DataNode[] = []
        modules.map(module => {
            dataTree.push({
                key: module.id,
                title: module.label,
                children: module.children?.map(children => ({
                    key: module.label+'/'+children.label,
                    title: children.label
                }))
            })
        })
        setGData(dataTree)
    }, [modules])

    const onDragEnter: TreeProps['onDragEnter'] = (info) => {
        console.log('Solo viendo',info);
    };

    const onDrop: TreeProps['onDrop'] = (info) => {
        console.log('--------------------------------')
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        
        console.log('Analizando',{
            dropKey,
            dragKey,
            dropPos,
            dropPosition
        })
        console.log('todo',{info:info})
        if(!info.dragNode.children){
            return 
        }
        const loop = (
            data: DataNode[],
            key: React.Key,
            callback: (node: DataNode, i: number, data: DataNode[]) => void,
        ) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children!, key, callback);
                }
            }
        };
        const data = [...gData];

        // Find dragObject
        let dragObj: DataNode;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
            });
        } else if (
            ((info.node as any).props.children || []).length > 0 && // Has children
            (info.node as any).props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
                // in previous version, we use item.children.push(dragObj) to insert the
                // item to the tail of the children
            });
        } else {
            let ar: DataNode[] = [];
            let i: number;
            loop(data, dropKey, (_item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i!, 0, dragObj!);
            } else {
                ar.splice(i! + 1, 0, dragObj!);
            }
        }
        console.log('--------------------------------')
        setGData(data);
    };
    return (
        <Tree
            className="draggable-tree"
            draggable
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            treeData={gData}
        />
    )
}

export default ListModules