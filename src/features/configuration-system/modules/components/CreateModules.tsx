import { CloseOutlined, MinusOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import React, { Fragment, useEffect, useState } from 'react'
import { IChildrensModules, IModules } from '../../../../interfaces/modules-interface'
import { useForm } from 'antd/es/form/Form'

const CreateModules = () => {
    const [haveChildrens, setHaveChildrens] = useState(false)
    const [cantSubMenus, setCantSubMenus] = useState(1)
    const [subMenus, setSubMenus] = useState<number[]>([1])
    const [sumando, setSumando] = useState<boolean | string>('initial')
    const [form] = useForm();


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
                        path: pathSubMenu
                    }
                    childrens.push(children)
                }
            }
        }
        const newModules: IModules = {
            label: values.nameMenu,
            path: values.pathMenu
        }
        if (haveChildrens) newModules.children = childrens
        console.log('newModules', newModules)
    }

    const onAddSubMenu = () => {
        setCantSubMenus(cantSubMenus + 1)
        setSubMenus(current => [...current, Math.max(...current) + 1])
    }
    console.log('subMenus=>', subMenus)
    console.log('cantSubMenus=>', cantSubMenus)

    const onLessSubMenuSelected = (subMenuSelected: number) => {
        if (subMenus.length > 1) {
            form.resetFields([`nameSubMenu${subMenuSelected}`, `pathSubMenu${subMenuSelected}`]);
            const nuevaCantidad = cantSubMenus - 1
            const cloneArray = [...subMenus]

            const subMenusFiltrados = cloneArray.filter(submenu => submenu !== subMenuSelected)
            console.log('subMenuSelected=>', subMenuSelected)
            console.log('cloneArray=>', cloneArray)
            console.log('subMenusFiltrados=>', subMenusFiltrados)
            setSubMenus(subMenusFiltrados)
        }
    }
    return (
        <>
            <Fragment>
                <Row justify='center' wrap gutter={[8, 8]}>
                    <Col span={16}>
                        <Form form={form} onFinish={onSubmit} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Form.Item label='Nombre' name={'nameMenu'} rules={[{ required: true, message: 'El nombre del menu es requerido' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Path' name={'pathMenu'} rules={[{ required: true, message: 'El path del menu es requerido' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Tiene sub menu'>
                                <Checkbox onChange={onChange} />
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
                                <Button icon={<SaveOutlined />} type='primary' htmlType='submit'>Guardar</Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Fragment >
        </>
    )
}

export default CreateModules