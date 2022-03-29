import { Button, Form, Input, message } from 'antd'

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function ReviewBox({ review, logbookId, reportId, setLogbook }) {
  const router = useRouter()
  const [posting, setPosting] = useState(false)
  const [form] = Form.useForm()

  const onFinish = (value) => postReview(value)

  const postReview = async (value) => {
    const reviewDetails = {
      logbookId,
      reportId,
      reviewText: value.review,
    }
    setPosting(true)

    const response = await fetch('/api/s/logbook/week/review', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(reviewDetails),
    })

    const data = await response.json()
    if (response.status === 200 && !data.error) {
      message.success('Review posted')
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
      {!review && (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Review text"
            name="review"
            rules={[
              {
                required: true,
                message: 'Please type your review!',
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
      {review && <p>{review}</p>}
    </>
  )
}
