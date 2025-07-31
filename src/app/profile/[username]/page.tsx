import React from 'react'

import { getLikedPosts, getUserPosts, getUserProfile } from '@/actions/profile.actions'
import UserProfile from './UserProfile'
import Navbar from '@/components/Navbar'
import requireAuth from '@/lib/requireAuth'

const profilePage = async ({ params }: { params: Promise<{ username: string }> }) => {
  await requireAuth()
  
  const { username } = await params
  const decodedName = decodeURIComponent(username) 
  const profile = await getUserProfile(decodedName)
  
  if (!profile) return <div>Profile not found</div>;

  const [posts, likedPosts] = await Promise.all([
    getUserPosts(profile.id),
    getLikedPosts(profile.id)
  ])

  
  return (
    <div className='px-5'>
      <div className='w-full'>
        <Navbar />
      </div>
      <div className='w-full max-w-[600px] pb-4 mx-auto'>
        <UserProfile profile={profile} posts={posts} likedPosts={likedPosts}/>
      </div>
    </div>
  )
}

export default profilePage