import { Typography, Row, Col, Alert } from 'antd'
import AttachmentCard from '../../components/company/AttachmentCard'
import SupervisorNav from '../../components/supervisor/navigation'

const { Title } = Typography

export default function CompanyHome() {
  return (
    <>
      <SupervisorNav />
      <Row>
        <Col lg={{ offset: 6 }} xs={{ offset: 1 }}>
          <Title level={3}>Attachment Postings</Title>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} lg={{ offset: 4, span: 16 }}>
          <AttachmentCard />
          <AttachmentCard />
          <AttachmentCard />
          <AttachmentCard />
        </Col>
      </Row>
    </>
  )
}
