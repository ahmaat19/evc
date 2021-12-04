import React from 'react'
import Image from 'next/image'
import { FaBookOpen, FaThumbsUp, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import moment from 'moment'
import { useUser } from '@auth0/nextjs-auth0'

const Story = ({ story }) => {
  const { user } = useUser()

  return (
    <div className='card shadow border-0'>
      {user && story && user.email === story.email && (
        <div className='position-relative'>
          <button className='btn btn-danger btn-sm rounded-pill position-absolute end-0 top-0 shadow-lg animate__bounceIn '>
            <FaTrash className='mb-1' />
          </button>
        </div>
      )}
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
              Since: {moment(story.createdAt).startOf('hour').fromNow()}
            </span>
          </div>
        </div>
        <div className='position-relative'>
          <button
            disabled={!!!user}
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
