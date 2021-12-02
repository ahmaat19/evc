import nc from 'next-connect'
import db from '../../../../utils/db'
import Stories from '../../../../models/Stories'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

const handler = nc()

export default withApiAuthRequired(
  handler.put(async (req, res) => {
    const _id = req.query.id
    const session = getSession(req, res)

    const { title, type, content } = req.body
    const tag = !Array.isArray(req.body.tag)
      ? req.body.tag.split(',').trim()
      : req.body.tag.trim()

    await db()
    const story = await Stories.findOne({ _id, user: session.user.email })
    if (story) {
      story.title = title
      story.type = type
      story.content = content
      story.tag = tag
      story.image = session.user.image
      story.user = session.user.email
      await story.save()
      res.status(200).json({ status: 'success' })
    } else {
      return res.status(404).send('Sorry, story not found')
    }
  })
)
