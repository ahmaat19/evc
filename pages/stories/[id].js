import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { storyDetail } from '../../utils/Stories'
import {
  FaTrash,
  FaPencilAlt,
  FaBookOpen,
  FaArrowCircleLeft,
  FaThumbsUp,
  FaPlus,
} from 'react-icons/fa'
import moment from 'moment'

const StoryDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const story = storyDetail(id)

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

              <div className='card-text text-muted fw-light mt-2'>
                <span> Published by: {story && story.author}</span>
                <span>
                  {' '}
                  Since:{' '}
                  {story &&
                    moment(story.publishedDate).startOf('hour').fromNow()}
                </span>
              </div>
              <div className='position-relative'>
                <button
                  className='btn btn-success btn-sm rounded-pill position-absolute shadow-lg animate__bounceIn'
                  style={{ top: 0, right: '45%' }}
                >
                  <FaThumbsUp className='mb-1' /> {story && story.like}
                </button>
              </div>
            </div>
          </div>

          <div className='card border-0 shadow mt-4'>
            <div className='card-body'>
              <div className='card-text'>
                <p> {story && story.description} </p>
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
