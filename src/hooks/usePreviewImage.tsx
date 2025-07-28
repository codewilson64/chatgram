import React, { useState } from 'react'

const usePreviewImage = () => {
  const [uploadedImg, setUploadedImg] = useState<string |  null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0]
    if(files && files.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => setUploadedImg(reader.result as string)   
      reader.readAsDataURL(files)
    }
  }

  return { handleImageChange, uploadedImg, setUploadedImg }
}

export default usePreviewImage