import { Card, Col, Row } from 'antd'
import React from 'react'
import SpacesEventsConfig from './components/SpacesEventsConfig'

const EventConfigurationView = () => {
  return (
    <Row gutter={[16, 16]} wrap >
      <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
        <SpacesEventsConfig />
      </Col>
      {/*  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
        <TypeMeenting />
      </Col>
      <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
        <ConfigSpaces />
      </Col>
      <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
        <ConfigMeet />
      </Col> */}
    </Row>
  )
}

export default EventConfigurationView