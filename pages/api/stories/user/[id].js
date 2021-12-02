import nc from 'next-connect'
import db from '../../../../utils/db'
import Stories from '../../../../models/Stories'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

const handler = nc()

export default withApiAuthRequired(
  handler.get(async (req, res) => {
    const user = req.query.id
    await db()
    const stories = await Stories.find({ user, type: 'public' })
    res.status(200).json(stories)
  })
)
