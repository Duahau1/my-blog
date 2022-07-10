import { Card, CardContent, CardHeader, CardMedia } from '@mui/material'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PreviewBlogPostType } from '../../models/blog-post.model'
import './blog-post-preview.scss'
export type BlogPostPreviewAnimationType = {
  targets: string
  loop: boolean
  delay: number
  easing: string
  duration: number
  translateX: number
  translateY: number
}
export type MouseAnimationBaseType =
  | Omit<BlogPostPreviewAnimationType, 'translateX' | 'translateY'>
  | BlogPostPreviewAnimationType

export default function BlogPostPreview(props: any) {
  const { left, top, zIndex, opacity, scale } = props
  const previewObject: PreviewBlogPostType = props.previewObject
  const excerptContent = useRef(null)
  const fullExcerpt = useRef(null)
  const [show, setShow] = useState(false)

  const navigate = useNavigate()

  const mouseOutHandler: MouseEventHandler = (event): void => {
    const targetElement = event.target as HTMLElement
    const elementzIndex = Number(targetElement.style.zIndex)
    if (elementzIndex > 100) {
      setShow(false)
      targetElement.classList.remove('animation-forward')
      targetElement.classList.add('animation-reverse')
    }
  }
  const mouseEnterHandler: MouseEventHandler = (event): void => {
    const targetElement = event.target as HTMLElement
    const elementzIndex = Number(targetElement.style.zIndex)
    if (elementzIndex > 100) {
      setShow(true)
      targetElement.classList.remove('animation-reverse')
      targetElement.classList.add('animation-forward')
    }
  }
  const mouseClickHandler: MouseEventHandler = (event): void => {
    const routeConfig = {
      to: `/blog/${previewObject.postId}`,
      state: { state: { id: previewObject.postId } },
    }
    navigate(routeConfig.to, routeConfig.state)
  }
  useEffect(() => {
    excerptContent.current.innerHTML = previewObject.excerpt
    if (fullExcerpt.current != null) {
      const appendElement = document.createElement('div')
      appendElement.innerHTML = previewObject.excerpt
      fullExcerpt.current.append(appendElement)
    }
  }, [show])

  return (
    <Card
      className='blog-post-preview'
      style={{
        left: left,
        opacity: opacity,
        top: top,
        transform: `scale(${scale})`,
        zIndex: zIndex || 10,
      }}
      onMouseOut={mouseOutHandler}
      onMouseEnter={mouseEnterHandler}
      onClick={mouseClickHandler}
    >
      <CardHeader title={previewObject.header}></CardHeader>
      <CardMedia
        sx={{ height: '250px' }}
        component='img'
        className='blog-post-preview-page-img'
        alt='previewImg'
        image={previewObject.previewImg}
      />
      <div className='card-footer'>
        <CardContent ref={excerptContent}></CardContent>
        {/* <CardActions>
          <DHButton
            routeConfig={{
              to: `/blog/${previewObject.postId}`,
              state: { state: { id: previewObject.postId } },
            }}
          ></DHButton>
        </CardActions> */}
      </div>
      {show ? <div className='fillSpan' ref={fullExcerpt}></div> : null}
    </Card>
  )
}
