import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FaTrash,
  FaBookOpen,
  FaArrowCircleLeft,
  FaThumbsUp,
  FaPlus,
} from 'react-icons/fa'
import moment from 'moment'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0'

const StoryDetails = ({ story }) => {
  const { user } = useUser()
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
            {user && story && user.email === story.email && (
              <div className='position-relative'>
                <button className='btn btn-danger btn-sm rounded-pill position-absolute end-0 top-0 shadow-lg animate__bounceIn '>
                  <FaTrash className='mb-1' />
                </button>
              </div>
            )}
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
                  Since: {moment(story.createdAt).startOf('hour').fromNow()}
                </span>
              </div>
              <div className='position-relative'>
                <button
                  disabled={!!!user}
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
  const { data } = await axios.get(
    `http://localhost:3000/api/stories/${params.id}`
  )
  return {
    props: {
      story: data,
    },
  }
}

export const getStaticPaths = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/stories/get-all`)
  const ids = data.map((d) => d._id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))
  return {
    paths,
    fallback: false,
  }
}
