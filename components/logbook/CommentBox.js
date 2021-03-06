import { Button, Form, Input, message } from 'antd'

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function CommentBox({ logbookId, setLogbook, commentType }) {
  const router = useRouter()
  const [posting, setPosting] = useState(false)
  const [form] = Form.useForm()

  const onFinish = (value) => postComment(value)

  const postComment = async (value) => {
    let commentDetails
    if (commentType === 'first') {
      commentDetails = {
        logbookId,
        firstComment: value.comment,
      }
    } else {
      commentDetails = {
        logbookId,
        finalComment: value.comment,
      }
    }

    setPosting(true)

    const response = await fetch(`/api/l/comment/${commentType}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(commentDetails),
    })

    const data = await response.json()
    if (response.status === 200 && !data.error) {
      message.success('Comments posted')
      setPosting(false)
      setLogbook(data)
      await router.replace(router.asPath)
    } else {
      message.info(data.error)
      setPosting(false)
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label={
          commentType === 'first' ? 'First visit comments' : 'Final comments'
        }
        name="comment"
        rules={[
          {
            required: true,
            message: 'Please type your comment!',
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
  )
}
