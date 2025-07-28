import { useState } from "react";
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
import { Textarea } from "./ui/textarea";
import { MessageCircle } from 'lucide-react';
import { createComment } from '@/actions/post.actions';

export function CommentButton({ post }: {post: {id: string; comments: number}}) {  
  const [comments, setComments] = useState(post?.comments) 
  const [newComment, setNewComment] = useState('')
  const [isCommenting, setIsCommenting] = useState(false)
  const [error, setError] = useState<string | undefined>('')
  
  const handlePostComment = async () => {
    if(isCommenting) return
    setIsCommenting(true)
    try {
      const response = await createComment(post.id, newComment)
      if(response?.success) {
        setNewComment('')
      } else {
        setError(response?.error)
      }
    } 
    catch (error: any) {
      console.log(error.message)
    }
    finally {
      setIsCommenting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='flex items-center gap-1'>
          <MessageCircle className='size-4 text-gray-600'/>
          <span className='text-gray-500 text-sm'>{comments}</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Comment</AlertDialogTitle>
          <Textarea 
            placeholder="Post your reply"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePostComment} disabled={!newComment.trim()}>Post</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
