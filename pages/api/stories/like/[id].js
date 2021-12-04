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
    const story = await Stories.findById(_id)

    if (story) {
      if (story.like.includes(session.user.email)) {
        const likes = story.like.filter((email) => email !== session.user.email)
        story.like = likes
        await story.save()
        res.status(200).json({ status: 'success' })
      } else {
        story.like.push(session.user.email)
        await story.save()
        res.status(200).json({ status: 'success' })
      }
    } else {
      return res.status(404).send('Sorry, story not found')
    }
  })
)
