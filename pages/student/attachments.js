import { Typography, Row, Col } from 'antd'
import StudentNav from '../../components/student/navigation'
const { Title } = Typography

export default function StudentHome() {
  return (
    <>
      <StudentNav />
      <Title level={3}>Student Attachments</Title>
    </>
  )
}
