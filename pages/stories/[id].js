import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FaBookOpen,
  FaArrowCircleLeft,
  FaThumbsUp,
  FaPlus,
} from 'react-icons/fa'
import moment from 'moment'
import axios from 'axios'

import db from '../../utils/db'
import Stories from '../../models/Stories'
import convertDocToObj from '../../utils/convertDocToObj'

const StoryDetails = ({ story }) => {
  return (
    <>
      <Link href='/'>
        <a>
          <button className='btn btn-primary btn-sm rounded-pill shadow-lg animate__bounceIn'>
            <FaArrowCircleLeft className='mb-1' /> Back
          </button>
        </a>
      </Link>
      <div className='row'>
        <div className='col-lg-6 col-md-8 col-12 mx-auto'>
          <div className='card border-0 shadow'>
            <div className='position-relative'>
              <button
                disabled={true}
                className='btn btn-success btn-sm rounded-pill position-absolute shadow-lg animate__bounceIn'
                style={{ top: 0, right: '0%' }}
              >
                <FaThumbsUp className='mb-1' /> {story && story.like.length}
              </button>
            </div>

            <FaBookOpen className='card-img-top display-1 text-muted' />
            <div className='card-body text-center'>
              <h5 className='card-title fw-light'>{story && story.title}</h5>

              {story &&
                story.tag.map((tag) => (
                  <div
                    key={tag}
                    className='badge bg-light text-secondary fw-light rounded-0 shadow-lg m-1'
                  >
                    #{tag}
                  </div>
                ))}

              <div className='card-text text-muted text-center fw-light mt-2'>
                <hr />
                <Image
                  src={story.picture}
                  alt={story.name}
                  width='30'
                  height='30'
                  className='rounded-pill'
                />
                <br />
                {story.name} <br />
                {story.email} <br />
                <span>
                  Since:{' '}
                  {moment(new Date(story.createdAt)).startOf('hour').fromNow()}
                </span>
              </div>
            </div>
          </div>

          <div className='card border-0 shadow mt-4'>
            <div className='card-body'>
              <div className='card-text'>
                <p> {story && story.content} </p>
              </div>
            </div>
          </div>
          {/* eslint-disable */}
          <a href='/profile/stories'>
            <button
              className='btn btn-success btn-sm rounded-pill position-fixed shadow-lg animate__bounceIn animate__lightSpeedInRight'
              style={{ zIndex: 111, right: '30px', bottom: '30px' }}
            >
              <FaPlus className='mb-1' />
            </button>
          </a>
          {/* eslint-enable */}
        </div>
      </div>
    </>
  )
}

export default StoryDetails

export const getStaticProps = async ({ params }) => {
  await db()
  const story = await Stories.findOne({
    type: 'public',
    _id: params.id,
  }).lean()

  return {
    props: {
      story: convertDocToObj(story),
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  await db()
  const stories = await Stories.find({ type: 'public' }).lean()
  const storyLists = stories.map(convertDocToObj)

  const ids = storyLists.map((d) => d._id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))
  return {
    paths,
    fallback: 'blocking',
  }
}
