import mongoose, { mongo } from 'mongoose'
import bcrypt from 'bcryptjs'

const userScheme = mongoose.Scheme(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

// encrypting password before saved into database
userScheme.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const Users = mongoose.Model.Users || mongoose.Model('Users', userScheme)
export default Users
