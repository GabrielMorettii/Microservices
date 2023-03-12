import React from 'react'
import Link from 'next/link'
import { CurrentUser } from '@/types'

interface Props {
  currentUser: CurrentUser | null
}

interface ILink {
  label: string
  href: string
  visible: boolean
}

const Header = ({ currentUser }: Props) => {
  const links: ILink[] = [
    { label: 'Sign Up', href: '/auth/signup', visible: !currentUser },
    { label: 'Sign In', href: '/auth/signin', visible: !currentUser },
    { label: 'Sign Out', href: '/auth/signout', visible: currentUser !== null }
  ]

  const renderedLinks = links.map((link, index) => {
    if (link.visible) {
      return (
        <Link key={index} className='nav-item' href={link.href}>
          <div className='nav-link'>{link.label}</div>
        </Link>
      )
    }
  })

  return (
    <nav className='navbar navbar-light bg-light'>
      <Link href='/' className='navbar-brand'>
        GitTix
      </Link>

      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>{renderedLinks}</ul>
      </div>
    </nav>
  )
}

export default Header
