'use server'

import prisma from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import cloudinary from "@/lib/cloudinary"

export const getUserProfile = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        createdAt: true
      }
    })  
    return user 
  } 
  catch (error) {
    console.log('Error fetching profile', error)
    throw new Error('Failed to fetch profile')
  }
}

export const getLikedPosts = async (userId: string) => {
  try {
    const likedPosts = await prisma.like.findMany({
      where: {
        userId: userId
      },
      include: {
        post: { 
          select: { 
            id: true, 
            title: true,
            image: true, 
            author: { 
              select: { 
                id: true, 
                username: true, 
                image: true 
            }},
            likes: {
              select: {
                userId: true
              }
            },
            _count : {
              select : {
                likes: true,
                comments: true
              }
            }
          }}
        },
        orderBy: {
          createdAt: "desc"
        }
    })

    return likedPosts
  } 
  catch (error) {
    console.log("Error fetching user liked posts", error)
    throw new Error('Error fetching user liked posts')
  }
}

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId
      },
      include: {
        author: { select: { id: true, username: true, email: true, image: true } },
        likes: { select: { userId: true } },
        comments: { include: { author: { select: { id: true, username: true } } } },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: {
        createdAt: "desc"
      }
    })  

    return posts
  } 
  catch (error) {
    console.log("Error fetching user posts", error)
    throw new Error('Error fetching user posts')
  }
}

export const updateProfile = async (oldUsername: string, newUsername: string, image: string | null, bio: string | null) => {
  try {
    let imageUrl
    if(image) {
      const uploadedResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadedResponse.secure_url
    }

    await prisma.user.update({
      where: {
        username: oldUsername
      },
      data: {
        username: newUsername,
        ...(image && { image: imageUrl }),
        bio: bio
      }
    })
    revalidatePath(`/profile/${newUsername}`)
    return { success: "Profile updated" }
  } 
  catch (error) {
    console.log("Error updating profile", error)
    return {error: "Failed updating profile"}
  }
}
