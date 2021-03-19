import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.C_NAME,
  api_key: process.env.C_KEY,
  api_secret: process.env.C_SECRET,
})

export const uploadImage = (image: string) => {
  return cloudinary.v2.uploader.upload(image, (error, result) => {
    if (error) {
      console.log(error)
      throw new Error(error.message)
    }
    return result
  })
}
