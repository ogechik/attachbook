import Head from 'next/head'

import { Row, Col, Menu, Typography, message } from 'antd'
import { useRouter } from 'next/router'
const { Title } = Typography

export default function AdminLayout({ children, title }) {
  const router = useRouter()

  const handleMenuClick = async (e) => {
    switch (e.key) {
      case 'sessions':
        await router.push('/4dm1n/dash')
        break
      case 'students':
        await router.push('/4dm1n/students')
        break
      case 'lecturers':
        await router.push('/4dm1n/lecturers')
        break
      case 'supervisors':
        await router.push('/4dm1n/supervisors')
        break
      case 'companies':
        await router.push('/4dm1n/companies')
        break
      case 'logout':
        await logout()
        break
      default:
        await router.push('/4dm1n/dash')
    }
  }

  const logout = async () => {
    const response = await fetch('/api/auth/logout')
    if (response.status === 200) {
      message.success('logged out')
      await router.replace('/4dm1n')
    } else {
      message.error('something went wrong')
    }
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="white"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="black"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </Head>
      <main>
        <Row gutter={32} style={{ width: ' 100%' }}>
          <Col span={5}>
            <Row justify="center">
              <img
                src="/logo-sm.svg"
                alt="logo"
                style={{ marginTop: '2rem', marginBottom: '1rem' }}
              />
            </Row>
            <Row justify="center">
              <Title level={5}>Admin</Title>
            </Row>
            <Menu
              onClick={handleMenuClick}
              style={{ width: 256 }}
              mode="inline"
            >
              <Menu.Item key="sessions">Attachment Sessions</Menu.Item>
              <Menu.Item key="students">Students</Menu.Item>
              <Menu.Item key="lecturers">Lecturers</Menu.Item>
              <Menu.Item key="supervisors">Supervisors</Menu.Item>
              <Menu.Item key="companies">Companies</Menu.Item>
              <Menu.Item key="logout">Logout</Menu.Item>
            </Menu>
          </Col>
          <Col style={{ marginTop: '2.5rem' }} span={18}>
            {children}
          </Col>
        </Row>
      </main>
    </>
  )
}
