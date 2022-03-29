import { Menu, Typography, Row, Col, Drawer, Button } from 'antd'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './navbar.module.css'
const { Title } = Typography
const { SubMenu } = Menu

export default function StudentNav() {
  const router = useRouter()
  const [current, setCurrent] = useState('')
  const [visible, setVisible] = useState(false)

  const changePage = async (url) => {
    await router.push(url)
  }
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const handleClick = (e) => {
    setCurrent(e.key)
    setVisible(false)
  }

  return (
    <>
      <nav className={styles.bigMenu}>
        <Row justify="center">
          <Col span={6}>
            <div style={{ display: 'flex', paddingTop: '0.75rem' }}>
              <a href="/">
                <Image
                  src="/logo-sm.svg"
                  alt="attachbook logo"
                  height={32}
                  width={32}
                />
              </a>
              <Title
                level={3}
                style={{
                  marginLeft: '1rem',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              >
                Attachbook
              </Title>
            </div>
          </Col>
          <Col span={8} offset={8}>
            <Menu
              onClick={handleClick}
              selectedKeys={[current]}
              mode="horizontal"
            >
              <Menu.Item key="logbook">
                <Button
                  type="text"
                  onClick={() => changePage('/student/logbook')}
                >
                  Logbook
                </Button>
              </Menu.Item>
              <Menu.Item key="attachments">
                <Button
                  type="text"
                  onClick={() => changePage('/student/attachments')}
                >
                  Attachments
                </Button>
              </Menu.Item>
              <SubMenu key="SubMenu" title="John">
                <Menu.ItemGroup title="Actions">
                  <Menu.Item key="profile">
                    {' '}
                    <Button
                      type="text"
                      onClick={() => changePage('/student/attachments')}
                    >
                      Profile
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="logout">
                    <Button
                      type="text"
                      onClick={() => changePage('/student/attachments')}
                    >
                      Logout
                    </Button>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </nav>

      <nav className={styles.smallMenu}>
        <Row style={{ margin: '0.5rem' }} align="middle">
          <Col span={18}>
            <a href="/" style={{ display: 'flex' }}>
              <Image
                src="/logo-sm.svg"
                alt="attachbook logo"
                height={32}
                width={32}
              />
              <Title
                level={4}
                style={{
                  marginLeft: '0.7rem',
                  paddingTop: '0.5rem',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  textAlign: 'center',
                }}
              >
                Attachbook
              </Title>
            </a>
          </Col>
          <Col span={6}>
            <div className={styles.menuBtn} onClick={showDrawer}>
              <img src="/menu.svg" height={32} width={32} />
            </div>
            <Drawer
              title="Attachbook Menu"
              placement="right"
              onClose={onClose}
              visible={visible}
            >
              <Menu
                onClick={handleClick}
                selectedKeys={[current]}
                mode="inline"
              >
                <Menu.Item key="logbook">
                  <Button
                    type="text"
                    onClick={() => changePage('/student/logbook')}
                  >
                    Logbook
                  </Button>
                </Menu.Item>
                <Menu.Item key="attachments">
                  <Button
                    type="text"
                    onClick={() => changePage('/student/attachments')}
                  >
                    Attachments
                  </Button>
                </Menu.Item>
                <Menu.Item key="profile">
                  <Button
                    type="text"
                    onClick={() => changePage('/student/attachments')}
                  >
                    Profile
                  </Button>
                </Menu.Item>
                <Menu.Item key="logout">
                  <Button
                    type="text"
                    onClick={() => changePage('/student/attachments')}
                  >
                    Logout
                  </Button>
                </Menu.Item>
              </Menu>
            </Drawer>
          </Col>
        </Row>
      </nav>
    </>
  )
}
