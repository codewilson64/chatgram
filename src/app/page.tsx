import Container from '@/components/layout/Container'
import Logout from '@/components/Logout'
import Homepage from './home/page'

const page = () => {
  return (
    <Container>
      <Homepage />
      <Logout />
    </Container>
  )
}

export default page