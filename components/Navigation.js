import React from 'react'
import dynamic from 'next/dynamic'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import { FaBookOpen, FaRss, FaSignInAlt, FaUserPlus } from 'react-icons/fa'

const Navigation = () => {
  const [session] = useSession()
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
              <span className='nav-link'>{session && session.user.email}</span>
            </li>
            <li className='nav-item'>
              <Link href='/'>
                <a className='nav-link' aria-current='page'>
                  <FaRss className='mb-1' /> Feed
                </a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/signup'>
                <a className='nav-link' aria-current='page'>
                  <FaUserPlus className='mb-1' /> Signup
                </a>
              </Link>
            </li>
            <li className='nav-item'>
              {!session ? (
                <Link href='/login'>
                  <a className='nav-link' aria-current='page'>
                    <FaSignInAlt className='mb-1' /> Login
                  </a>
                </Link>
              ) : (
                <span
                  onClick={signOut}
                  className='nav-link'
                  aria-current='page'
                >
                  <FaSignInAlt className='mb-1' /> Logout
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default dynamic(() => Promise.resolve(Navigation), { ssr: false })
