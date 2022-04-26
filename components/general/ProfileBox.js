import { useRouter } from 'next/router'
import { Button, Input, message } from 'antd'
import { useState } from 'react'

export default function ProfileBox({ user, setUser }) {
  const router = useRouter()
  const [fname, setFName] = useState(user?.firstName)
  const [lname, setLName] = useState(user?.lastName)
  const [floading, setFLoading] = useState(false)
  const [lloading, setLLoading] = useState(false)
  const [feditMode, setFEditMode] = useState(false)
  const [leditMode, setLEditMode] = useState(false)

  const handleLChange = (e) => {
    setLName(e.target.value)
  }

  const handleFChange = (e) => {
    setFName(e.target.value)
  }

  const updateFirstName = async (firstName) => {
    setFLoading(true)
    const response = await fetch('/api/s/update/firstName', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ firstName }),
    })

    if (response.status === 200) {
      setFLoading(false)
      const updatedUser = await response.json()
      setUser(updatedUser)
      await router.replace(router.asPath)
      setFEditMode((mode) => !mode)
      message.success('First name updated')
    } else {
      setFLoading(false)
      message.warning('something went wrong')
    }
  }

  const updateLastName = async (lastName) => {
    setLLoading(false)
    const response = await fetch('/api/s/update/lastName', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ lastName }),
    })
    if (response.status === 200) {
      setLLoading(false)
      const updatedUser = await response.json()
      setUser(updatedUser)
      await router.replace(router.asPath)
      setLEditMode((mode) => !mode)
      message.success('Last name updated')
    } else {
      setLLoading(false)
      message.warning('something went wrong')
    }
  }

  return (
    <>
      <div style={{ marginBottom: '1.5rem' }}>
        {!feditMode && (
          <p>
            FirstName: {user?.firstName}{' '}
            <Button
              type="text"
              onClick={() => setFEditMode((mode) => !mode)}
              icon={<img src="/edit.svg" alt="edit" />}
            />
          </p>
        )}
        {feditMode && (
          <Input.Group compact>
            <Input
              style={{ width: 'calc(100% - 100px)' }}
              value={fname}
              onChange={handleFChange}
            />
            <Button
              type="primary"
              style={{ marginRight: '1rem' }}
              icon={<img src="/checkII.svg" alt="check" />}
              loading={floading}
              onClick={() => updateFirstName(fname)}
            />
            <Button
              type="text"
              icon={
                <img
                  src="/times.svg"
                  alt="cancel"
                  onClick={() => setFEditMode((mode) => !mode)}
                />
              }
            />
          </Input.Group>
        )}
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        {!leditMode && (
          <p>
            LastName: {user?.lastName}{' '}
            <Button
              type="text"
              onClick={() => setLEditMode((mode) => !mode)}
              icon={<img src="/edit.svg" alt="edit" />}
            />
          </p>
        )}
        {leditMode && (
          <Input.Group compact>
            <Input
              style={{ width: 'calc(100% - 100px)' }}
              value={lname}
              onChange={handleLChange}
            />
            <Button
              type="primary"
              style={{ marginRight: '1rem' }}
              icon={<img src="/checkII.svg" alt="check" />}
              loading={lloading}
              onClick={() => updateLastName(lname)}
            />
            <Button
              type="text"
              icon={
                <img
                  src="/times.svg"
                  alt="cancel"
                  onClick={() => setLEditMode((mode) => !mode)}
                />
              }
            />
          </Input.Group>
        )}
      </div>
      <div>
        <p>Email: {user?.email}</p>
      </div>
    </>
  )
}
