import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import _ from 'lodash-es'
import { useEffect, useState } from 'react'
import BlogPostPreview from '../blog-post/blog-post-preview.component'
import './carousel.scss'
export default function Carousel(props: any) {
  const SPEED = 5
  const [carouselHeight, setCarouselHeight] = useState(window.innerHeight - 204)
  const [deg, setDeg] = useState(0)
  const [itemObj, setItemObj] = useState([])
  const [oldDeg, setOldDeg] = useState(0)
  const [rangeX, setRangeX] = useState(window.innerWidth - 300)
  const [show, setShow] = useState(false)
  const blogPostPreviews = props.items
  const [blockClick, setBlockClick] = useState(false)
  const itemNumber = blogPostPreviews.length
  const itemSeparation = 360 / itemNumber
  let counter = oldDeg

  function degToRad(input) {
    return input * (Math.PI / 180)
  }

  function handleNext() {
    if (!blockClick) {
      setOldDeg(deg)
      setDeg((curDeg) => {
        return Number(curDeg) + itemSeparation
      })
      setBlockClick(true)
    }
  }
  function handlePrev() {
    if (!blockClick) {
      setOldDeg(deg)
      setDeg((curDeg) => {
        return Number(curDeg) - itemSeparation
      })
      setBlockClick(true)
    }
  }
  function animation() {
    let done = false
    const rangeY = carouselHeight - 750

    if (deg - oldDeg < 0 && counter > deg) {
      counter -= SPEED
    } else if (deg - oldDeg > 0 && counter < deg) {
      counter += SPEED
    } else {
      setBlockClick(false)
      done = true
    }
    const temp = []

    for (let i = 0; i < itemNumber; i++) {
      const itemDeg = counter + (360 / itemNumber) * i
      const sin = 0.5 + Math.sin(degToRad(itemDeg)) * 0.5
      const cos = 0.5 + Math.cos(degToRad(itemDeg)) * 0.5
      const zIndex = 1 + Math.round(cos * 100)
      const scale = 0.5 + cos * 0.5
      const opacity = 0.1 + cos * 0.9
      temp.push({
        left: sin * rangeX,
        top: cos * rangeY,
        zIndex: zIndex,
        scale: scale,
        opacity: opacity,
      })
    }
    setItemObj(blogPostPreviews.map((item, index) => ({ ...item, ...temp[index] })))
    if (oldDeg !== deg && done !== true) {
      requestAnimationFrame(animation)
    }
  }
  useEffect(() => {
    function handleResize() {
      setRangeX(window.innerWidth - 300)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', _.noop)
    }
  }, [])
  useEffect(() => {
    let mounted = true
    if (mounted) {
      // window.addEventListener('mousedown',()=>{
      //     setShow(false);
      // })
      animation()
    }
    return () => {
      mounted = false
    }
  }, [deg, rangeX])

  return (
    <div className='carousel-modal'>
      <div className='carousel-container'>
        {!show ? (
          <ArrowBackIosNewIcon
            className='carousel-control'
            htmlColor='white'
            fontSize='large'
            onClick={handlePrev}
          ></ArrowBackIosNewIcon>
        ) : null}
        <div>
          {itemObj.map((blogPostPreview: any) => {
            return (
              <BlogPostPreview
                left={blogPostPreview.left}
                top={blogPostPreview.top}
                zIndex={blogPostPreview.zIndex}
                opacity={blogPostPreview.opacity}
                scale={blogPostPreview.scale}
                key={blogPostPreview.postId}
                previewObject={blogPostPreview}
              ></BlogPostPreview>
            )
          })}
        </div>
        {!show ? (
          <ArrowForwardIosIcon
            className='carousel-control'
            htmlColor='white'
            fontSize='large'
            onClick={handleNext}
          ></ArrowForwardIosIcon>
        ) : null}
      </div>
    </div>
  )
}
