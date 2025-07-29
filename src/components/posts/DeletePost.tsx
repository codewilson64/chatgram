'use client'

import { Trash2 } from 'lucide-react';
import { deletePost } from '@/actions/post.actions'

const DeletePost = ({post}: {post: { id: string }}) => {

  const handleDelete = async () => {
    await deletePost(post.id)
  }

  return (
    <div>
      <Trash2 onClick={handleDelete} size={17} className='text-gray-600 cursor-pointer'/>
    </div>
  )
}

export default DeletePost