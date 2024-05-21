import axios from "axios"
import React, { ChangeEvent } from "react"

interface UploadImageProps {
  onUpload: (url: string) => void
}

export const UploadImage: React.FC<UploadImageProps> = ({ onUpload }) => {
  const presetKey = "EcommerceProject"
  const cloudName = "dm102fmp0"

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", presetKey)

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        )
        onUpload(response.data.secure_url)
      } catch (error) {
        console.error("Error uploading image:", error)
      }
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  )
}
