import anime from 'animejs/lib/anime.es.js'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './button.scss'

export default function DHButton(props: any) {
  const { routeConfig } = props
  const button = useRef(null)
  const buttonTopLeft = useRef(null)
  const buttonTopRight = useRef(null)
  const buttonBottomLeft = useRef(null)
  const buttonBottomRight = useRef(null)
  const navigate = useNavigate()
  function handleClick(): void {
    // Scaling effect
    anime
      .timeline()
      .add({
        targets: button.current,
        scale: [1, 1.05],
        translateZ: 0,
        easing: 'spring(2, 60, 30, 7)',
      })
      .add(
        {
          targets: button.current,
          scale: [1.05, 1],
          translateZ: 0,
          easing: 'spring(1, 50, 40, 3)',
        },
        '-=1200',
      )
    // Drop effect
    anime
      .timeline()
      .add({
        targets: buttonTopLeft.current,
        translateY: [0, -15],
        translateX: [0, -15],
        scale: [1, 0.9],
        translateZ: 0,
        easing: 'spring(2, 60, 30, 7)',
      })
      .add(
        {
          targets: buttonTopLeft.current,
          translateY: [-15, -40],
          translateX: [-15, -40],
          scale: [0.9, 0],
          translateZ: 0,
          easing: 'spring(1, 50, 40, 3)',
        },
        '-=1200',
      )
    anime
      .timeline()
      .add({
        targets: buttonBottomRight.current,
        translateY: [0, 15],
        translateX: [0, 15],
        scale: [1, 0.9],
        translateZ: 0,
        easing: 'spring(2, 60, 30, 7)',
      })
      .add(
        {
          targets: buttonBottomRight.current,
          translateY: [15, 40],
          translateX: [15, 40],
          scale: [0.9, 0],
          translateZ: 0,
          easing: 'spring(1, 50, 40, 3)',
        },
        '-=1200',
      )
    anime
      .timeline()
      .add({
        targets: buttonBottomLeft.current,
        translateY: [0, 15],
        translateX: [0, -15],
        scale: [1, 0.5],
        translateZ: 0,
        easing: 'spring(2, 60, 30, 7)',
      })
      .add(
        {
          targets: buttonBottomLeft.current,
          translateY: [15, 30],
          translateX: [-15, -30],
          scale: [0.5, 0],
          translateZ: 0,
          easing: 'spring(1, 50, 40, 3)',
        },
        '-=1200',
      )
    anime
      .timeline()
      .add({
        targets: buttonTopRight.current,
        translateY: [0, -15],
        translateX: [0, 15],
        scale: [1, 0.5],
        translateZ: 0,
        easing: 'spring(2, 60, 30, 7)',
      })
      .add(
        {
          targets: buttonTopRight.current,
          translateY: [-15, -30],
          translateX: [15, 30],
          scale: [0.5, 0],
          translateZ: 0,
          easing: 'spring(1, 50, 40, 3)',
        },
        '-=1200',
      )
    // After the animation ends
    setTimeout(() => navigate(routeConfig.to, routeConfig.state), 1200)
  }
  return (
    <button ref={button} className='btn-trigger' onClick={handleClick}>
      <div className='btn-container'>
        <span>View More</span>
        <div ref={buttonBottomLeft} className='btn bottom-left'></div>
        <div ref={buttonBottomRight} className='btn bottom-right'></div>
        <div ref={buttonTopLeft} className='btn top-left'></div>
        <div ref={buttonTopRight} className='btn top-right'></div>
      </div>
    </button>
  )
}
