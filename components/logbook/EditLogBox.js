import { Button, Form, Input, message, Row, Col } from 'antd'

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function EditLogBox({ log, logbookId, reportId, setLogbook }) {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [posting, setPosting] = useState(false)
  const [form] = Form.useForm()

  const onFinish = (value) => postLog(value)

  const postLog = async (value) => {
    const logDetails = {
      logbookId,
      reportId,
      logId: log._id,
      logText: value.log,
    }

    setPosting(true)

    const response = await fetch('/api/s/logbook/fill', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(logDetails),
    })
    const data = await response.json()
    if (response.status === 200 && !data.error) {
      message.success('Log updated')
      setPosting(false)
      setEditMode((mode) => !mode)
      setLogbook(data)
      await router.replace(router.asPath)
    } else {
      message.info(data.error)
      setPosting(false)
    }
  }

  return (
    <>
      {editMode && (
        <Form
          form={form}
          layout="vertical"
          initialValues={{ log: log.log }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Log"
            name="log"
            rules={[
              {
                required: true,
                message: 'Please type your log!',
              },
            ]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '30%' }}
              loading={posting}
            >
              Update
            </Button>
            <Button
              style={{ marginLeft: '1rem' }}
              onClick={() => setEditMode((mode) => !mode)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
      {!editMode && (
        <Row>
          <Col span={24}>
            <p>
              {log.log}{' '}
              <Button
                type="text"
                onClick={() => setEditMode((mode) => !mode)}
                icon={<img src="/edit.svg" alt="edit" />}
              />
            </p>
          </Col>
        </Row>
      )}
    </>
  )
}
