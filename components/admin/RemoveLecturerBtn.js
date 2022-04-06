import { Button, message } from 'antd'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function RemoveLecturerBtn({
  sessionId,
  lecturerId,
  setSession,
}) {
  const router = useRouter()
  const [removing, setRemoving] = useState(false)
  const removeLecturer = async () => {
    const postData = {
      sessionId,
      lecturerId,
    }
    setRemoving(true)
    const response = await fetch('/api/a/attachment/session/lecturer/remove', {
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
        setRemoving(false)
        setSession(data)
        await router.replace(router.asPath)
        message.success('lecturer removed')
      } else {
        setRemoving(false)
        message.warning('lecturer could not be removed')
      }
    } else {
      setRemoving(false)
      message.warning('lecturer could not be removed')
    }
  }
  return (
    <Button type="default" onClick={removeLecturer} loading={removing}>
      remove
    </Button>
  )
}
