import React from 'react'
import { Col, Row } from 'react-bootstrap'

const FormContainer = ({children}) => {
  return (
    <Row className="justify-content-md-center my-3">
      <Col md={6}>
        {children}
      </Col>
    </Row>
  )
}

export default FormContainer
