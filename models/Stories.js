import mongoose from 'mongoose'

const storyScheme = mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    tag: { type: [String], required: true },
    content: { type: String, required: true },
    like: [String],
    email: { type: String },
    picture: { type: String },
    name: { type: String },
  },
  { timestamps: true }
)

const Stories =
  mongoose.models.Stories || mongoose.model('Stories', storyScheme)
export default Stories
