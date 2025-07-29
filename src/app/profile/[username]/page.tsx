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

  const posts = await getUserPosts(profile.id)
  const likedPosts = await getLikedPosts(profile.id)
  
  return (
    <>
      <div className='p-4'>
        <Navbar />
      </div>
      <UserProfile profile={profile} posts={posts} likedPosts={likedPosts}/>
    </>
  )
}

export default profilePage