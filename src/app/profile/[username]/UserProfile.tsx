'use client'

import React from 'react'
import { useAuth } from '@/context/AuthContext'
import blankImg from '../../../../public/blankProfile.webp'
import Image from 'next/image'
import { UserProfileProps } from '@/types'
import PostCard from '../../../components/posts/PostCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UpdateProfile from './UpdateProfile'

const UserProfile = ({ profile, posts, likedPosts }: UserProfileProps) => {
  const { user } = useAuth()
  const myProfile = user?.id === profile.id

  return (
    <div className="flex flex-col gap-3 border border-gray-300/60 dark:border-zinc-300/20 rounded-lg">
      {/* Top content */}
      <div className='mb-6 px-3 py-3'>
        <div className='flex items-center justify-between'>
          <div className='rounded-full mb-3'>
            <Image 
              src={ profile?.image || blankImg } 
              alt="profile-img" 
              width={96} 
              height={96} 
              className='size-28 rounded-full object-cover'
            />
          </div>
          <div>
            {myProfile && (
              <UpdateProfile profile={profile}/>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-xl font-bold'>{profile.username}</p>
          {profile.bio && <p className='text-lg'>{profile.bio || ""}</p>}
          <p className='text-sm text-gray-500'>Joined {profile.createdAt.toDateString()}</p>
        </div>
      </div>
      {/* Bottom content */}
      <Tabs defaultValue="posts" className="">
        <div className='px-3'>
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>
        </div>
        <TabsContent value="posts">
          <div className='flex flex-col gap-3 border-t border-gray-300/50 dark:border-zinc-300/20 p-3'>
            {user && posts?.map((post) => (
              <PostCard key={post.id} post={post} user={user}/>
            ))}
            {posts?.length === 0 && (
              <div className='h-60 text-sm text-gray-500 flex items-center justify-center'>You have no posts</div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="likes">
          <div className='flex flex-col gap-3 border-t border-gray-300/50 dark:border-zinc-300/20 p-3'>
            {user && likedPosts?.map((likedPost) => (
              <PostCard key={likedPost.id} likedPost={likedPost} user={user}/>
            ))}
            {likedPosts?.length === 0 && (
              <div className='h-60 text-sm text-gray-500 flex items-center justify-center'>You have no liked posts</div>
            )}
          </div>
        </TabsContent>
      </Tabs>     
    </div>
  )
}

export default UserProfile