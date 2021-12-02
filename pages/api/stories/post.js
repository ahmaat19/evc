import nc from 'next-connect'
import db from '../../../utils/db'
import Stories from '../../../models/Stories'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

const handler = nc()

export default withApiAuthRequired(
  handler.post(async (req, res) => {
    const session = getSession(req, res)
    await db()
    const { title, type, content } = req.body
    const tag = !Array.isArray(req.body.tag)
      ? req.body.tag.split(',').trim()
      : req.body.tag.trim()

    const create = await Stories.create({
      title,
      type,
      content,
      tag,
      image: session.user.image,
      user: session.user.email,
    })

    if (create) {
      res.status(201).json({ status: 'success' })
    } else {
      return res.status(400).send('Invalid data')
    }
  })
)
