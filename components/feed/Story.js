import React from 'react'
import Image from 'next/image'
import { FaBookOpen, FaThumbsUp, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import moment from 'moment'
import { useUser } from '@auth0/nextjs-auth0'

import { deleteStory, updateStoryLike } from '../../api/stories'
import { useMutation, useQueryClient } from 'react-query'

const Story = ({ story }) => {
  const { user } = useUser()

  const queryClient = useQueryClient()

  const { mutateAsync: updateMutateAsync } = useMutation(updateStoryLike, {
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries(['stories'])
    },
  })

  const { mutateAsync: deleteMutateAsync } = useMutation(deleteStory, {
    retry: 0,
    onSuccess: () => queryClient.invalidateQueries(['stories']),
  })

  const deleteHandler = async (id) => {
    window.confirm('Are you sure you want to delete this story?') &&
      (await deleteMutateAsync(id))
  }

  return (
    <div className='card shadow border-0'>
      {user && story && user.email === story.email && (
        <div className='position-relative'>
          <button
            onClick={() => deleteHandler(story && story._id)}
            className='btn btn-danger btn-sm rounded-pill position-absolute end-0 top-0 shadow-lg animate__bounceIn '
          >
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
          {story &&
            story.tag.map((tag) => (
              <div
                key={tag}
                className='badge bg-light text-secondary fw-light rounded-0 shadow-lg m-1'
              >
                #{tag}
              </div>
            ))}
          <Link href={`/user/${story.email}`}>
            <a>
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
            </a>
          </Link>
        </div>
        <div className='position-relative'>
          <button
            disabled={!!!user}
            onClick={() => updateMutateAsync(story && story)}
            className='btn btn-success btn-sm rounded-pill position-absolute shadow-lg animate__bounceIn'
            style={{ top: 0, right: '45%' }}
          >
            <FaThumbsUp className='mb-1' /> {story.like.length}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Story
