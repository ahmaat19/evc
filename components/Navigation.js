import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FaBookOpen, FaRss, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useUser } from '@auth0/nextjs-auth0'

const Navigation = () => {
  const { user } = useUser()
  return (
    <nav className='navbar navbar-expand-sm navbar-light bg-light'>
      <div className='container'>
        <Link href='/'>
          <a className='navbar-brand d-flex align-items-center'>
            <FaBookOpen className='d-inline-block align-text-top me-2 fs-2' />
            Storybook
          </a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link href='/'>
                <a className='nav-link' aria-current='page'>
                  <FaRss className='mb-1' /> Feed
                </a>
              </Link>
            </li>
            {/* eslint-disable */}
            <li className='nav-item'>
              {user ? (
                <a
                  href='/api/auth/logout'
                  className='nav-link'
                  aria-current='page'
                >
                  <FaSignOutAlt className='mb-1' /> LogOut
                </a>
              ) : (
                <a
                  href='/api/auth/login'
                  className='nav-link'
                  aria-current='page'
                >
                  <FaSignInAlt className='mb-1' /> LogIn
                </a>
              )}
            </li>
            {/* eslint-enable */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default dynamic(() => Promise.resolve(Navigation), { ssr: false })
