// 'use client'

// import { Button } from "../ui/button"
// import { Textarea } from "../ui/textarea"
// import Image from "next/image"
// import blankImg from '../../../public/blankProfile.webp'
// import { useAuth } from "@/context/AuthContext"
// import Link from "next/link"
// import { ImagePlus } from 'lucide-react';
// import { useRef } from "react"
// import usePreviewImage from "@/hooks/usePreviewImage"

// type PostFormProps = {
//   title: string
//   setTitle: (title: string) => void
//   loading: boolean
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
//   error?: string
//   success?: string
// }

// const PostForm: React.FC<PostFormProps> = ({title, setTitle, handleSubmit, loading, error}) => {
//   const { user } = useAuth()
//   const fileRef = useRef<HTMLInputElement | null>(null)

//   return (
//     <form onSubmit={handleSubmit} className="w-[600px] border border-gray-300/60 dark:border-zinc-300/20 rounded-t-lg gap-3 py-3 px-3 mx-auto">
//       <div className="w-full flex items-start justify-center">
//         <Link href={`/profile/${user?.username}`} className='w-[10%] rounded-full'>
//           <Image 
//             src={ user?.image || blankImg } 
//             alt="profile-img" 
//             width={96} 
//             height={96} 
//             className='size-10 rounded-full object-cover'
//           />
//         </Link>

//         <div className="w-full flex flex-col gap-3">
//           <Textarea 
//             placeholder="What's happening?"
//             className="w-full resize-none"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)} 
//           />
//           <div className="w-full flex items-center justify-between">
//             <ImagePlus onClick={() => fileRef.current?.click()} className="size-5 text-blue-500 cursor-pointer" />
//             <Button type="submit" disabled={!title.trim()} className="w-[15%] text-center rounded-full cursor-pointer">
//               {loading ? 'Posting...' : 'Post'}
//             </Button>
//             <input type="file" accept="image/*" hidden ref={fileRef} onChange={handleImageChange}/>
//           </div>
//         </div>
//       </div>
//       {error && <div className="text-red-500 text-sm">{error}</div>}
//     </form>
//   )
// }

// export default PostForm