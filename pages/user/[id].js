import React from 'react'
import ComponentStories from '../../components/feed/Stories'

import db from '../../utils/db'
import Stories from '../../models/Stories'
import convertDocToObj from '../../utils/convertDocToObj'

const Profile = ({ stories }) => {
  return (
    <div>
      {' '}
      <ComponentStories stories={stories && stories} />
    </div>
  )
}

export default Profile

export const getStaticProps = async ({ params }) => {
  await db()
  const stories = await Stories.find({
    type: 'public',
    email: params.id,
  }).lean()

  return {
    props: {
      stories: stories.map(convertDocToObj),
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  await db()
  const stories = await Stories.find({ type: 'public' }).lean()
  const storyLists = stories.map(convertDocToObj)

  const ids = storyLists.map((d) => d.email.toString())
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))
  return {
    paths,
    fallback: 'blocking',
  }
}
