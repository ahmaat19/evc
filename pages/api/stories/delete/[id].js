import nc from 'next-connect'
import db from '../../../../utils/db'
import Stories from '../../../../models/Stories'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

const handler = nc()

export default withApiAuthRequired(
  handler.put(async (req, res) => {
    const _id = req.query.id
    const session = getSession(req, res)

    await db()
    const story = await Stories.findOne({ _id, user: session.user.email })
    if (story) {
      await story.remove()
      res.status(200).json({ status: 'success' })
    } else {
      return res.status(404).send('Sorry, story not found')
    }
  })
)
