import React from 'react'
import Link from 'next/link'
import { FaTimesCircle } from 'react-icons/fa'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const stories = () => {
  return (
    <div>
      <Link href='/'>
        <a>
          <button className='btn btn-danger btn-sm rounded-pill shadow-lg animate__bounceIn'>
            <FaTimesCircle className='mb-1' /> Cancel
          </button>
        </a>
      </Link>
      <h6 className='text-center text-info'>
        Create new story or Update existed story
      </h6>
    </div>
  )
}

export default stories

export const getServerSideProps = withPageAuthRequired()
