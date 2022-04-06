import { Button, Form, message, Select } from 'antd'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function AddLecturer({ sessionId, setSession, setAddLecturer }) {
  const router = useRouter()
  const [adding, setAdding] = useState(false)
  const [lecturers, setLecturers] = useState([])

  useEffect(() => {
    const fetchLecturers = async () => {
      const response = await fetch('/api/a/lecturers')
      if (response.status === 200) {
        const data = await response.json()
        setLecturers(data)
      }
    }
    fetchLecturers()
  }, [])

  const onFinish = (value) => addLecturer(value)

  const addLecturer = async (value) => {
    const postData = {
      sessionId,
      lecturerId: value.lecturer,
    }
    setAdding(true)
    const response = await fetch('/api/a/attachment/session/lecturer/add', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(postData),
    })
    if (response.status === 200) {
      const data = await response.json()
      if (!data.error) {
        setAdding(false)
        setSession(data)
        await router.replace(router.asPath)
        setAddLecturer(false)
        message.success('lecturer added')
      } else {
        setAdding(false)
        message.warning(data.error)
      }
    } else {
      setAdding(false)
      message.warning('lecturer could not be removed')
    }
  }
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="lecturer"
        label="Select lecturer"
        rules={[
          {
            required: true,
            message: 'Please select a lecturer',
          },
        ]}
      >
        <Select placeholder="select lecturer">
          {lecturers.map((lecturer) => (
            <Select.Option value={lecturer._id} key={lecturer._id}>
              {`${lecturer.firstName} ${lecturer.lastName}`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          loading={adding}
        >
          Add Lecturer
        </Button>
      </Form.Item>
    </Form>
  )
}
