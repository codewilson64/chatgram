import { getPostById } from '@/actions/post.actions'
import Navbar from '@/components/Navbar'
import PostCard from '@/components/posts/PostCard'
import getUserFromToken from '@/lib/auth.helper'
import Image from 'next/image'
import Link from 'next/link'
import blankImg from '../../../../public/blankProfile.webp'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getUserFromToken()
  const post = await getPostById(id)
  console.log(post)

  return (
    <div className='px-5 pb-5'>
      <div className='w-full'>
        <Navbar />
      </div>

      <div className='max-w-[600px] mx-auto border border-gray-300/60 dark:border-zinc-300/20 rounded-lg'>
        <div className='w-full p-3'>
          {post && <PostCard post={post} user={user}/>}
        </div>

        <div className='border border-l-0 border-r-0 border-gray-300/60 dark:border-zinc-300/20 p-3 mb-3'>
          {post?.comments.length} Comments
        </div>

        <div className='w-full p-3'>
          {post && post.comments.map((comment) => (
            <div key={comment.id} className='mb-3'>
                <div className="flex items-start gap-3">
                <Link href={`/profile/${comment.author.username}`} className='shrink-0 block w-10 h-10 rounded-full overflow-hidden'>
                    <Image 
                    src={ comment.author.image || blankImg } 
                    alt="profile-img" 
                    width={50} 
                    height={50} 
                    className='w-full h-full object-cover'
                    />
                </Link>

                <div className='flex-1'>
                    <div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                        <Link href={`/profile/${comment.author.username}`} className='font-bold dark:text-gray-200 hover:underline'>{comment.author.username}</Link>
                            <p className='dark:text-gray-500 text-sm'>@{comment.author.username}</p>
                        </div>
                    </div>
                        <p className='mb-3 text-sm dark:text-gray-200'>{comment.content}</p>
                    </div>
                </div>
                </div>
            </div>
            ))}
          {post && post.comments.length === 0 && (
            <div className='h-60 text-sm text-gray-500 flex items-center justify-center'>No comments yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default page