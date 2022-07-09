import { Tab, Tabs } from '@mui/material'
import React, { useRef } from 'react'
import { matchPath, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { lineDrawingAnimation } from '../../utils/animation.utils'

export default function PrimaryNav() {
  const animation = useRef(null)
  const navigate = useNavigate()

  function mouseEnterHandle() {
    lineDrawingAnimation(animation.current.querySelector('path'))
  }
  function mouseClickHandlder() {
    navigate('/home')
  }
  function useRouteMatch(patterns: readonly string[]) {
    const { pathname } = useLocation()

    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i]
      const possibleMatch = matchPath(pattern, pathname)
      if (possibleMatch !== null) {
        return possibleMatch
      }
    }

    return null
  }

  const routeMatch = useRouteMatch(['/home', '/blog', '/blog/:id'])
  let currentTab = routeMatch?.pattern?.path.replace('/blog/:id', '/blog') ?? '/home'

  return (
    <div className='animationTab'>
      <div className='animatedLogo' onMouseEnter={mouseEnterHandle} onClick={mouseClickHandlder}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='3.9 6.9 12.2 2.2' ref={animation}>
          <path
            d='M 4 9 A 2 1 0 0 0 4 7 L 4 9 L 6 7 M 6 7 c 0 1 0 2 1 2 C 8 9 8 8 8 7 L 9 7 L 8 9 M 9 7 L 10 9 L 10 9 L 10 9 M 10 9 L 8 9 M 10 7 L 10 9 M 12 9 L 12 9 L 12 7 M 10 8 L 12 8 M 13 7 L 13 7 L 12 9 M 14 9 L 13 7 M 12 9 L 14 9 L 14 9 M 14 7 C 14 8 14 9 15 9 C 16 9 16 8 16 7 L 14 9'
            stroke='#fff'
            strokeWidth='0.2'
            fill='none'
          />
        </svg>
      </div>
      <Tabs value={currentTab}>
        <Tab label='Home' value='/home' to='/home' component={NavLink} />
        <Tab label='Blog' value='/blog' to='/blog' component={NavLink} />
      </Tabs>
    </div>
  )
}
