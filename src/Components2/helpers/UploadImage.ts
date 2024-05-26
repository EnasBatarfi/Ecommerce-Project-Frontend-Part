export const UploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "EcommerceProject")
  formData.append("folder", "full-stack-project")
  const cloudName = "dm102fmp0"

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    })
    if (!response.ok) {
      throw new Error("Failed to upload the image")
    }
    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error("Error uploading the image to Cloudinary", error)
    throw error
  }
}
