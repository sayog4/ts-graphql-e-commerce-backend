import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

/**
 * @description user model
 */

interface IUser extends Document {
  email: string
  password: string
  name: string
  phone: string
  isAdmin: boolean
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      reyired: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.pre<IUser>('save', async function (next: mongoose.HookNextFunction) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (pw: string) {
  return await bcrypt.compare(pw, this.password)
}

const User = mongoose.model<IUser>('User', userSchema)

export { IUser, User }
