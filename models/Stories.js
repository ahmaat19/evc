import mongoose from 'mongoose'

const storyScheme = mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    tag: { type: [String], required: true },
    content: { type: String, required: true },
    like: { type: Number, default: 0 },
    user: { type: String, required: true, unique: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
)

const Stories =
  mongoose.models.Stories || mongoose.model('Stories', storyScheme)
export default Stories
