import { Button } from 'antd'
import { useRouter } from 'next/router'

export default function GoBack() {
  const router = useRouter()
  const previousPage = async () => {
    await router.back()
  }
  return (
    <Button type="default" onClick={previousPage}>
      Go Back
    </Button>
  )
}
