import { Card, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material'
import { useEffect, useRef } from 'react'
import { PreviewBlogPostType } from '../../models/blog-post.model'
import DHButton from '../button/button.component'
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
  useEffect(() => {
    excerptContent.current.innerHTML = previewObject.excerpt
  }, [])

  return (
    <Card
      className='blog-post-preview'
      style={{
        opacity: opacity,
        left: left,
        top: top,
        zIndex: zIndex || 10,
        transform: `scale(${scale})`,
      }}
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
        <CardActions>
          <DHButton
            routeConfig={{
              to: `/blog/${previewObject.postId}`,
              state: { state: { id: previewObject.postId } },
            }}
          ></DHButton>
        </CardActions>
      </div>
      <span className='fillSpan'></span>
    </Card>
  )
}
