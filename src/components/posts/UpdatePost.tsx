'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import React, { useState } from 'react'
import { Pencil, X } from 'lucide-react';
import { Post } from '@prisma/client';
import { updatePost } from '@/actions/post.actions';
import { Textarea } from "../ui/textarea";

const UpdatePost = ({post}: {post: { id: string }}) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | undefined>('')

  const handleUpdate = async () => {
    setIsUpdating(true)
    setError('')

    try {
      const response = await updatePost(post.id, title)
      if(response.success) {
        setIsUpdating(false)
      } else {
        setError(response.error)
      }
    } 
    catch (error) {
      console.log(error)
    }
    finally {
      setIsUpdating(false)
      setTitle('')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Pencil size={17} className='text-gray-600 cursor-pointer'/>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update</AlertDialogTitle>
          <Textarea 
            placeholder="Update your post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="resize-none"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate} disabled={!title.trim()}>Post</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdatePost