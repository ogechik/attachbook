import { Button } from 'antd'
import { useRouter } from 'next/router'

export default function GoBack() {
  const router = useRouter()
  const previousPage = async () => {
    await router.back()
  }
  return (
    <Button type="default" onClick={previousPage} icon={<BackIcon />}>
      Go Back
    </Button>
  )
}

function BackIcon() {
  return <img src="/arrow-left.svg" alt="<" />
}
