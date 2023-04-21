import { CloseOutlined, MinusOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import React, { Fragment, useEffect, useState } from 'react'
import { IChildrensModules, IModules } from '../../../../interfaces/modules-interface'
import { useForm } from 'antd/es/form/Form'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { createModule } from '../../../../store/menus/thunks'
import { FormProps } from 'react-router-dom'
import useGetModule from '../hooks/useGetModule'

interface IFormModulesProps extends FormProps {
    isEdit: boolean
    moduleId: string
}
//todo: termianr el formulario de edicion
const FormModules = ({ isEdit, moduleId }: IFormModulesProps) => {
    const [haveChildrens, setHaveChildrens] = useState(false)
    const [cantSubMenus, setCantSubMenus] = useState(1)
    const [subMenus, setSubMenus] = useState<number[]>([1])
    const [form] = useForm();
    const dispatch = useAppDispatch()
    const { modules, isMutation } = useAppSelector(selector => selector.menu)
    const { loading, module } = useGetModule(moduleId)
    const onChange = (e: CheckboxChangeEvent) => {
        setHaveChildrens(e.target.checked)
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
            order: modules.length,
            status: 'avalible',
            icon: "ponselo careverga",
            children: childrens
        }
        dispatch(createModule(newModules))
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

    useEffect(() => {
        console.log(module)
        if (module?.children && module.children.length > 0) setHaveChildrens(true)
    }, [])

    useEffect(() => {
        if (!!module) {
            form.setFieldValue('nameMenu',module.label)
            form.setFieldValue('pathMenu',module.path)
            
        };
    }, [module])
    
console.log('isEdit',isEdit)
    return (
        <>
            <Fragment>
                <Row justify='center' wrap gutter={[8, 8]}>
                    <Col span={16}>
                        <Form form={form} onFinish={onSubmit} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Form.Item  label='Nombre' name={'nameMenu'} rules={[{ required: true, message: 'El nombre del menu es requerido' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item initialValue={isEdit ? module.path : ''} label='Path' name={'pathMenu'} rules={[{ required: true, message: 'El path del menu es requerido' }]}>
                                <Input />
                            </Form.Item>
                            {
                                !isEdit && (
                                    <Form.Item label='Tiene sub menu' name='haveSubmenus'>
                                        <Checkbox onChange={onChange} />
                                    </Form.Item>
                                )
                            }
                            {
                                (haveChildrens && !isEdit) && subMenus.map((item, index) => {
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
                            {(haveChildrens && !isEdit) && (
                                <Row justify={'end'} gutter={[8, 8]}>
                                    <Col>
                                        <Button icon={<PlusCircleOutlined />} type='dashed' onClick={onAddSubMenu}>Agregar submenu</Button>
                                    </Col>

                                </Row>
                            )
                            }
                            <Row>
                                <Button loading={isMutation} icon={<SaveOutlined />} type='primary' htmlType='submit'>Guardar</Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Fragment >
        </>
    )
}

export default FormModules