import Navbar from '@/components/Navbar'
import CreatePost from '@/components/posts/CreatePost'
import PostsList from '@/components/posts/PostsList'
import requireAuth from '@/lib/requireAuth'

const Homepage = async () => {
  await requireAuth()

  return (
    <div>
      <div className='w-full'>
        <Navbar />
      </div>
      <div className='w-full'>
        <CreatePost />
        <PostsList />
      </div>
    </div>
  )
}

export default Homepage