import React from 'react'
import { FaBookOpen, FaPencilAlt, FaThumbsUp, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import moment from 'moment'

const Story = ({ story }) => {
  return (
    <div className='card shadow border-0'>
      <div className='position-relative'>
        <button className='btn btn-danger btn-sm rounded-pill position-absolute end-0 top-0 shadow-lg animate__bounceIn '>
          <FaTrash className='mb-1' />
        </button>

        {/* eslint-disable */}
        <a href='/profile/stories'>
          <button
            className='btn btn-primary btn-sm rounded-pill position-absolute top-0 shadow-lg animate__bounceIn '
            style={{ right: '40px' }}
          >
            <FaPencilAlt className='mb-1' />
          </button>
        </a>
        {/* eslint-enable */}
      </div>
      <Link href={`/stories/${story._id}`}>
        <a>
          <FaBookOpen className='card-img-top display-1 text-muted' />
        </a>
      </Link>
      <div className='card-body text-center'>
        <h5 className='card-title fw-light'>
          <Link href={`/stories/${story._id}`}>
            <a>{story.title}</a>
          </Link>
        </h5>
        <div className='card-text'>
          {story.tag.map((tag) => (
            <div
              key={tag}
              className='badge bg-light text-secondary fw-light rounded-0 shadow-lg m-1'
            >
              #{tag}
            </div>
          ))}
          <div className='card-text text-muted fw-light mt-2'>
            <span> Published by: {story.author}</span>
            <span>
              {' '}
              Since: {moment(story.publishedDate).startOf('hour').fromNow()}
            </span>
          </div>
        </div>
        <div className='position-relative'>
          <button
            className='btn btn-success btn-sm rounded-pill position-absolute shadow-lg animate__bounceIn'
            style={{ top: 0, right: '45%' }}
          >
            <FaThumbsUp className='mb-1' /> {story.like}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Story
