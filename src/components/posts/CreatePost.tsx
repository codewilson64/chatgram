'use client'

import { createPost } from "@/actions/post.actions"
import { useRef, useState } from "react"
import usePreviewImage from "@/hooks/usePreviewImage"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import Image from "next/image"
import { Textarea } from "../ui/textarea"
import { ImagePlus, X } from "lucide-react"
import blankImg from '../../../public/blankProfile.webp'
import { Button } from "../ui/button"

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>('')
  const fileRef = useRef<HTMLInputElement | null>(null)
  const { handleImageChange, uploadedImg, setUploadedImg } = usePreviewImage()
  const { user } = useAuth()

  const handleClose = () => {
    setUploadedImg(null)
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await createPost(title, uploadedImg)
      if(response.success) {
        console.log(response.success)
      } else {
        setError(response.error)
      }
    } 
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
      setTitle('')
      setUploadedImg(null)
    }
  }

  return (     
    <form onSubmit={handleCreate} className="max-w-[600px] border border-gray-300/60 dark:border-zinc-300/20 rounded-t-lg gap-3 py-3 px-3 mx-auto">
      <div className="flex items-start gap-2">
        <Link href={`/profile/${user?.username}`} className='shrink-0 block w-10 h-10 rounded-full overflow-hidden'>
          <Image 
            src={ user?.image || blankImg } 
            alt="profile-img" 
            width={50} 
            height={50} 
            className='w-full h-full object-cover'
          />
        </Link>

        <div className="w-full flex flex-col gap-3">
          <Textarea 
            placeholder="What's happening?"
            className="w-full resize-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            />
            {uploadedImg && (
              <div className="relative w-fit">
                <Image src={uploadedImg} alt="uploaded image" width={800} height={600} className="w-full max-w-md object-cover rounded-xl"/>
                <div className="absolute top-2 right-2 cursor-pointer p-2 bg-gray-400/50 rounded-full">
                  <X onClick={handleClose} className="size-5" />
                </div>
              </div>
            )}
          <div className="w-full flex items-center justify-between">
            <ImagePlus onClick={() => fileRef.current?.click()} className="size-5 text-blue-500 cursor-pointer" />
            <Button type="submit" disabled={!title.trim() && !uploadedImg?.trim()} className="w-[15%] text-center rounded-full cursor-pointer">
              {loading ? 'Posting...' : 'Post'}
            </Button>
            <input type="file" accept="image/*" hidden ref={fileRef} onChange={handleImageChange}/>
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  )
}

export default CreatePost