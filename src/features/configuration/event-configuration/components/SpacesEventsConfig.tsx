import { SaveOutlined } from '@ant-design/icons'
import { Button, Card, Tooltip, Typography } from 'antd'
import React from 'react'

const SpacesEventsConfig = () => {
    return (
        <Card
            hoverable
            style={{ height: "100%", backgroundColor: '#FDFEFE' }}
            title={
                <Tooltip placement='top' title='Configuración de meet'><Typography.Text strong>Configuración de <br /> meet</Typography.Text></Tooltip>}
            headStyle={{ border: 'none' }}
            extra={
                <Tooltip placement='top' title='Guardar configuración'>
                    <Button
                        type='primary'
                        //   loading={loading}
                        icon={<SaveOutlined />}
                    //   onClick={uptadeConfig}
                    >
                        Guardar
                    </Button>
                </Tooltip>
            }
        >


        </Card>
    )
}

export default SpacesEventsConfig