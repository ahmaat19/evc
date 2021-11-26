import React from 'react'
import Story from './Story'

const Stories = ({ stories }) => {
  return (
    <div className='row g-3'>
      {stories.map((story) => (
        <div key={story._id} className='col-lg-4 col-md-6 col-12'>
          <Story story={story} />
        </div>
      ))}
    </div>
  )
}

export default Stories
