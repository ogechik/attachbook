import { Typography, Row, Col, Divider } from 'antd'
import { useState } from 'react'
import StudentNav from '../../components/student/navigation'
import Layout from '../../components/Layout'
import ProfileBox from '../../components/general/ProfileBox'
import SupervisorNav from '../../components/supervisor/navigation'
const { Title } = Typography

export default function Opportunities({ profile }) {
  const [user, setUser] = useState(profile)
  return (
    <Layout title="User Profile">
      <SupervisorNav supervisor="company" />
      <Row justify="center">
        <Title level={3}>Profile</Title>
      </Row>
      <Divider />
      <Row justify="center">
        <Col xs={{ span: 22 }} lg={{ span: 16 }}>
          <ProfileBox user={user} setUser={setUser} />
        </Col>
      </Row>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { cookie } = context.req.headers

  const response = await fetch(`${process.env.DOMAIN}/api/auth/getUser`, {
    headers: { cookie },
  })

  if (response.status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  if (response.status === 200) {
    const profile = await response.json()
    return {
      props: { profile },
    }
  }
  return {
    props: { opportunities: null },
  }
}
