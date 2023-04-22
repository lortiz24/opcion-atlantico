import { CloseOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import React, { Fragment, useEffect, useState } from 'react'
import { IChildrensModules, IModules } from '../../../../interfaces/modules-interface'
import { useForm } from 'antd/es/form/Form'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { createModule, updateModule } from '../../../../store/menus/thunks'
import { FormProps } from 'react-router-dom'
import useGetModule from '../hooks/useGetModule'
import LoadingComponent from '../../../../components/loading/LoadingComponent';
import * as IconsAntDesign from '@ant-design/icons';
import useGetIconStringList from '../hooks/useGetIconStringList'

interface IFormModulesProps extends FormProps {
    isEdit: boolean
    moduleId: string
    onClose: () => void
}
//todo: termianr el formulario de edicion
const FormModules = ({ isEdit, moduleId, onClose }: IFormModulesProps) => {
    //estados
    const [haveChildrens, setHaveChildrens] = useState(false)
    const [cantSubMenus, setCantSubMenus] = useState(1)
    const [subMenus, setSubMenus] = useState<number[]>([1])
    //custom Hooks
    const { iconListString } = useGetIconStringList()
    //herramientas
    const [form] = useForm();
    const { isLoading, modules, isMutation } = useAppSelector(selector => selector.menu)
    const { module, loading: loadingEditModule } = useGetModule(moduleId)
    const dispatch = useAppDispatch()
    //metodos
    const onChange = (e: CheckboxChangeEvent) => {
        setHaveChildrens(e.target.checked)
    }

    const filterOption = (inputValue: string, option?: any) => {
        return option.value.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    }

    const onSubmit = (values: any) => {
        const childrens: any[] = []
        if (haveChildrens) {
            for (let index = 1; index <= Math.max(...subMenus); index++) {
                if (subMenus.includes(index)) {
                    const nameSubMenu = values[`nameSubMenu${index}`]
                    const pathSubMenu = values[`pathSubMenu${index}`]
                    const children: IChildrensModules = {
                        label: nameSubMenu,
                        path: pathSubMenu,
                        order: index,
                        status: 'avalible'
                    }
                    childrens.push(children)
                }
            }
        }
        const newModules: Omit<IModules, 'id'> = {
            label: values.nameMenu,
            path: values.pathMenu,
            order: isEdit ? module.order : modules.length,
            status: 'avalible',
            icon: values.icon ?? '',
            children: childrens
        }
        if (isEdit) {
            return dispatch(updateModule(moduleId, newModules, onClose))
        }
        dispatch(createModule(newModules, onClose))
    }

    const onAddSubMenu = () => {
        setCantSubMenus(cantSubMenus + 1)
        setSubMenus(current => [...current, Math.max(...current) + 1])
    }

    const onLessSubMenuSelected = (subMenuSelected: number) => {
        if (subMenus.length > 1) {
            form.resetFields([`nameSubMenu${subMenuSelected}`, `pathSubMenu${subMenuSelected}`]);
            const cloneArray = [...subMenus]
            const subMenusFiltrados = cloneArray.filter(submenu => submenu !== subMenuSelected)
            setSubMenus(subMenusFiltrados)
        }
    }

    //efectos
    useEffect(() => {
        if (isEdit && module) {
            form.setFieldValue('nameMenu', module.label)
            form.setFieldValue('pathMenu', module.path)
            form.setFieldValue('haveSubmenus', true)
            form.setFieldValue('icon', module.icon)
            if (module?.children && module.children.length > 0) {
                form.setFieldValue('haveSubmenus', true)
                setHaveChildrens(true)
                setCantSubMenus(module.children.length + 1)
                module.children.forEach((item, index) => {
                    if (index > 1) setSubMenus(current => [...current, index + 1])
                    form.setFieldValue(`nameSubMenu${index + 1}`, item.label)
                    form.setFieldValue(`pathSubMenu${index + 1}`, item.path)
                })
            }
        };
    }, [module])

    if (isEdit && loadingEditModule) return <LoadingComponent isLoading={loadingEditModule} />

    return (
        <>
            <Fragment >
                <Row justify='center' wrap gutter={[8, 8]}>
                    <Col span={16}>
                        <Form form={form} onFinish={onSubmit} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Form.Item label='Nombre' name={'nameMenu'} rules={[{ required: true, message: 'El nombre del menu es requerido' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Path' name={'pathMenu'} rules={[{ required: true, message: 'El path del menu es requerido' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Escoga un icono' name='icon'>
                                <Select allowClear showSearch filterOption={filterOption} >
                                    {iconListString.map(item => {
                                        return (
                                            <Select.Option key={item} value={item}>
                                                <Row justify='space-between'>
                                                    <Col>{item}</Col>
                                                    {/* @ts-ignore */}
                                                    <Col>{React.createElement(IconsAntDesign[item] ?? IconsAntDesign.UnorderedListOutlined)}</Col>
                                                </Row>
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label='Tiene sub menu' name='haveSubmenus'>
                                <Checkbox onChange={onChange} checked={haveChildrens} />
                            </Form.Item>


                            {
                                haveChildrens && subMenus.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Row justify='center' wrap gutter={[8, 8]} key={item}>
                                                <Col span={10}>
                                                    <Form.Item label='Nombre del submenu' name={`nameSubMenu${item}`} rules={[{ required: true, message: 'El nombre del submenu es requerido' }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={10}>
                                                    <Form.Item label='Path del submenu' name={`pathSubMenu${item}`} rules={[{ required: true, message: 'El path del menu es requerido' }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={2}>
                                                    <Button icon={<CloseOutlined />} onClick={() => onLessSubMenuSelected(item)}></Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                            {haveChildrens && (
                                <Row justify={'end'} gutter={[8, 8]}>
                                    <Col>
                                        <Button icon={<PlusCircleOutlined />} type='dashed' onClick={onAddSubMenu}>Agregar submenu</Button>
                                    </Col>

                                </Row>
                            )
                            }
                            <Row>
                                <Button loading={isLoading || isMutation} icon={<SaveOutlined />} type='primary' htmlType='submit'>Guardar</Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Fragment >
        </>
    )
}

export default FormModules