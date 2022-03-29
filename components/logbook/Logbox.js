import { Button, Form, Input, message } from 'antd'

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Logbox({ log, logbookId, reportId, setLogbook }) {
  const router = useRouter()
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
      message.success('Log posted')
      setPosting(false)
      setLogbook(data)
      await router.replace(router.asPath)
    } else {
      message.info(data.error)
      setPosting(false)
    }
  }

  return (
    <>
      {!log.log && (
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
              Post
            </Button>
          </Form.Item>
        </Form>
      )}
      {log.log && <p>{log.log}</p>}
    </>
  )
}
