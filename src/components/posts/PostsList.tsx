import { getPosts } from '@/actions/post.actions'
import getUserFromToken from '@/lib/auth.helper';
import PostCard from './PostCard'

const PostsList = async () => {
  const posts = await getPosts()
  const user = await getUserFromToken()
  console.log(posts)

  return (
    <div className="flex flex-col w-[600px] gap-3 mx-auto border border-t-0 border-gray-300/60 dark:border-zinc-300/20 p-4 rounded-b-lg">
      {posts?.success?.map((post) => (
        <PostCard key={post.id} post={post} user={user}/>
      ))}
    </div>
  )
}

export default PostsList