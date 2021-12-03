import nc from 'next-connect'
import db from '../../../utils/db'
import Stories from '../../../models/Stories'

const handler = nc()

export default handler.get(async (req, res) => {
  const _id = req.query.id
  await db()
  const stories = await Stories.findOne({ type: 'public' }, _id)
  res.status(200).json(stories)
})
