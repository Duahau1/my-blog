import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import logo from '../../assets/avatar-vxn.png'
import Avatar from '@mui/material/Avatar'
import './blog-post-author.scss'
export default function ContentAuthor(props: any) {
  return (
    <div className='author-container'>
      {props.children}
      <Avatar sx={{ width: 72, height: 72 }} src={logo} alt='duahau1-avatar' />
      <div className='author-information'>
        <span>@duahau1</span>
        <span>nguyendokhanhvan2909@gmail.com</span>
        <span>Galaga Front-end Software Engineer</span>
      </div>
      <div className='author-links'>
        <a href='https://github.com/Duahau1'>
          {' '}
          <GitHubIcon sx={{ width: 42, height: 42 }}></GitHubIcon>
        </a>
      </div>
    </div>
  )
}
