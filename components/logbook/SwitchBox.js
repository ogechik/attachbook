import { Button, message, Row, Col, Typography, Modal } from 'antd'

import { useState } from 'react'
import { useRouter } from 'next/router'
const { Text } = Typography

export default function SwitchBox({ logbook, week, setWeek, setLogbook }) {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [creating, setCreating] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = async () => {
    setVisible(false)
    setCreating(true)
    const logbookId = logbook._id
    const response = await fetch('/api/s/logbook/new/week', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ logbookId }),
    })
    const data = await response.json()
    if (response.status === 200 && !data.error) {
      message.success('New week created')
      setCreating(false)
      setLogbook(data)
      await router.replace(router.asPath)
    } else {
      message.info(data.error)
      setCreating(false)
    }
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const toPreviousWeek = () => {
    setWeek(week - 1)
  }
  const toNextWeek = () => {
    setWeek(week + 1)
  }

  return (
    <>
      <Row align="middle">
        <Text strong style={{ marginBottom: '0.5rem' }}>
          Attachment Week {week + 1}
        </Text>
      </Row>
      <Row gutter={32}>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          {week !== 0 && (
            <Button
              type="default"
              style={{ width: '100%', backgroundColor: '#e5e5e5' }}
              onClick={() => toPreviousWeek()}
            >
              <Row justify="space-between">
                <span>
                  <img src="/arrow-left.svg" alt="left" />
                </span>
                <span>Previous</span>
              </Row>
            </Button>
          )}
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          {week !== logbook.report.length - 1 && (
            <Button
              type="default"
              style={{ width: '100%', backgroundColor: '#e5e5e5' }}
              onClick={() => toNextWeek()}
            >
              <Row justify="space-between">
                <span>Next</span>
                <span>
                  <img src="/arrow-right.svg" alt="right" />
                </span>
              </Row>
            </Button>
          )}
          {week === logbook.report.length - 1 && logbook.report.length !== 12 && (
            <>
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={() => showModal()}
                loading={creating}
              >
                <Row justify="center">
                  <span>
                    <img src="/add-week.svg" alt="add" />
                  </span>
                  <span style={{ marginTop: '0.16rem', marginLeft: '0.5rem' }}>
                    New Week
                  </span>
                </Row>
              </Button>
              <Modal
                visible={visible}
                title="Create new week."
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    No, Return
                  </Button>,
                  <Button type="primary" onClick={handleOk}>
                    Yes, Create new week
                  </Button>,
                ]}
              >
                <p>Are you sure you want to create a new week?</p>
              </Modal>
            </>
          )}
        </Col>
      </Row>
    </>
  )
}
