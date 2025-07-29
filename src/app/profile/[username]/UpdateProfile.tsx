'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { useRef, useState } from "react"
import { updateProfile } from "@/actions/profile.actions"
import { useAuth } from "@/context/AuthContext"
import { UserProfileProps } from "@/types"
import { useRouter } from "next/navigation"
import blankImg from '../../../../public/blankProfile.webp'
import { Camera } from 'lucide-react';
import usePreviewImage from "@/hooks/usePreviewImage"
import { Textarea } from "@/components/ui/textarea"

const UpdateProfile = ({ profile }: UserProfileProps) => {
  const [newUsername, setNewUsername] = useState(profile.username)
  const [bio, setBio] = useState(profile.bio || "")
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | undefined>('')
  const { user, setUser } = useAuth()
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const { handleImageChange, uploadedImg } = usePreviewImage()

  const handleUpdate = async () => {
    setIsUpdating(true)
    setError('')

    try {
      const response = await updateProfile(profile.username, newUsername, uploadedImg, bio)
      if(response.success) {

        // Update localStorage
        const updatedUser = {
          id: profile.id,
          email: profile.email,
          username: newUsername,
          image: uploadedImg || profile.image,
          bio: bio
        }
        localStorage.setItem("user", JSON.stringify(updatedUser))

        // Update useAuth context
        setUser(updatedUser)
        router.push(`/profile/${newUsername}`)
      } else {
        setError(response.error)
      }   
    } 
    catch (error) {
      console.log(error)
    }
    finally {
      setIsUpdating(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='rounded-full'>
          Edit profile
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update</AlertDialogTitle>
          <div className="flex items-center justify-center">
            <div className='rounded-full mb-3 relative'>
              <img 
                src={typeof uploadedImg === "string" ? uploadedImg : blankImg.src} 
                alt="profile-img" 
                className='size-24 rounded-full object-cover'
              />
              <Camera
                onClick={() => fileRef.current?.click()} 
                className="absolute inset-0 m-auto cursor-pointer"
              />
              <input type="file" accept="image/*" hidden ref={fileRef} onChange={handleImageChange}/>
            </div>
          </div>
          <label>Name</label>
          <Input 
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <label>Bio</label>
          <Textarea 
            placeholder="Bio"
            className="w-full resize-none h-24 border px-3 rounded-md"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleUpdate} 
            disabled={!newUsername.trim() && !uploadedImg}
            >
              {isUpdating ? "Updating..." : "Update"}
            </AlertDialogAction>
            {error && <div className="text-red-500 font-sm">{error}</div>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateProfile