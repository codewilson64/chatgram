import Navbar from '@/components/Navbar'
import CreatePost from '@/components/posts/CreatePost'
import PostsList from '@/components/posts/PostsList'
import requireAuth from '@/lib/requireAuth'

const Homepage = async () => {
  await requireAuth()

  return (
    <div>
      <div className='p-4'>
        <Navbar />
      </div>
      <CreatePost />
      <PostsList />
    </div>
  )
}

export default Homepage