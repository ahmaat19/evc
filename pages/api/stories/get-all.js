import nc from 'next-connect'
import db from '../../../utils/db'
import Stories from '../../../models/Stories'

const handler = nc()

export default handler.get(async (req, res) => {
  await db()
  const stories = await Stories.find({ type: 'public' })
  res.status(200).json(stories)
})
