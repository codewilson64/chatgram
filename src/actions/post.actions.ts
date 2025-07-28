'use server'

import prisma from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import getUserFromToken  from '@/lib/auth.helper'
import cloudinary from "@/lib/cloudinary"

// Create Post
export const createPost = async (title: string, image: string | null) => {
  const user = await getUserFromToken()
  let imageUrl
  
  try {
    if(!title) {
      return {error: "Please fill the field"}
    }

    if(image) {
      const uploadedResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadedResponse.secure_url
    }

    await prisma.post.create({     
      data: { 
        title,
        ...(image && { image: imageUrl }),
        authorId: user.id
      }      
    })

    revalidatePath('/')
    return {success: 'Post created'}
  } 
  catch (error: any) {
    return {error: error.message}
  }
}

// Get Posts
export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
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
    
    return {success: posts}
  } 
  catch (error) {
    return {error: 'Post failed'}
  }
}

// Delete Post
export const deletePost = async (postId: string) => {
  try {
    await prisma.post.delete({
      where: {
        id: postId
      }
    })

    revalidatePath('/')
    return {success: "Post deleted"}
  } 
  catch (error) {
    return {error: 'Post deletion failed'}
  }
}

// Update Post
export const updatePost = async (postId: string, title: string) => {
  try {
    if(!title) {
      return {error: 'Please fill the field'}
    }

    await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        title
      }
    })

    revalidatePath('/')
    return {success: "Post updated"}
  } 
  catch (error) {
    return {error: "Update failed"}
  }
}

// Like Post
export const likePost = async (postId: string) => {
  const user = await getUserFromToken()
  if(!user) return

  try {
    // check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: { postId, userId: user.id}
      }
    })
    // If has both postId and userId...
    if(existingLike) {
      await prisma.like.delete({
        where: { 
          postId_userId: { postId, userId: user.id} 
        }
      })
    } else {
      await prisma.like.create({
        data: { 
          postId, userId: user.id 
        }
      })
    }

    revalidatePath('/')
    return {success: true}
  } 
  catch (error) {
    console.error("Like Error:", error)
    return { error: "Failed to like/unlike the post" }
  }
}

// Comment Post
export const createComment = async (postId: string, content: string) => {
  const user = await getUserFromToken()
  if(!user) return

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: user.id
      }
    })
    revalidatePath('/')
    return {success: true, comment}
  } 
  catch (error) {
    console.error("Create comment Error:", error)
    return { error: "Failed to comment the post" }
  }
}
