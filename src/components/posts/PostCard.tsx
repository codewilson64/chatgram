'use client'

import DeletePost from './DeletePost'
import UpdatePost from './UpdatePost'
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { LikedPostsProps, PostWithExtras, UserProfileProps } from '@/types';
import { likePost } from '@/actions/post.actions';
import { CommentButton } from '../CommentButton';
import Link from 'next/link';
import Image from 'next/image';
import blankImg from '../../../public/blankProfile.webp'

const PostCard = ({ post, user, likedPost }: {post?: PostWithExtras; user: { id: string }; likedPost?: LikedPostsProps}) => {
  const actualPost = post ?? likedPost?.post;
  if (!actualPost) return null;

  const [optimisticLikes, setOptimisticLikes] = useState(actualPost._count.likes)
  const [isLiking, setIsLiking] = useState(false)
  const [hasLiked, setHasLiked] = useState(actualPost.likes.some(like => like.userId === user?.id))

  const handleLike = async () => {
    if(isLiking) return 
    try {
      setIsLiking(true)
      setHasLiked(!hasLiked)
      setOptimisticLikes(prev => prev + (hasLiked ? -1 : 1))    
      await likePost(actualPost.id)
    } 
    catch (error) {
      setOptimisticLikes(actualPost._count.likes)
      setHasLiked(actualPost.likes.some(like => like.userId === user.id))
    }
    finally {
      setIsLiking(false)
    }
  }

  return (
    <div key={actualPost.id} className='mb-3'>
      <div className="w-full flex items-start">
        <Link href={`/profile/${actualPost.author.username}`} className='w-[10%] rounded-full'>
          <Image 
            src={ actualPost.author.image || blankImg } 
            alt="profile-img" 
            width={96} 
            height={96} 
            className='size-10 rounded-full object-cover'
          />
        </Link>

        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Link href={`/profile/${actualPost.author.username}`} className='font-bold dark:text-gray-200 hover:underline'>{actualPost.author.username}</Link>
              <p className='dark:text-gray-500 text-sm'>@{actualPost.author.username}</p>
            </div>
              {user?.id === actualPost.author.id && (
                <div className='flex items-center gap-3'>
                  <UpdatePost post={{id: actualPost.id}}/>
                  <DeletePost post={{id: actualPost.id}}/>
                </div>
              )}
              </div>
            <p className='mb-3 text-sm dark:text-gray-200'>{actualPost.title}</p>

             {actualPost.image ? (
               <Image src={actualPost.image} alt='post image' width={800} height={600} className='w-full object-cover mb-3 rounded-xl'/>
             ): null}

            {/* Actions */}
            <div className='flex items-center gap-6'>
              <button onClick={handleLike} className='flex items-center gap-1'>
                {hasLiked ? (
                  <Heart className='size-4 text-red-600 fill-red-600'/>
                ): (
                  <Heart className='size-4 text-gray-600'/>
                )}
                <span className='text-gray-500 text-sm'>{optimisticLikes}</span>
              </button>
              <CommentButton post={{ id: actualPost.id, comments: actualPost._count.comments }}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PostCard