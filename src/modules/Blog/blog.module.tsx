import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import React, { useContext, useEffect, useState } from 'react'
import Carousel from '../../components/carousel/carousel.component'
import { ContentfulResponseType, PreviewBlogPostType } from '../../models/blog-post.model'
import { BlogContext } from '../../providers/blog-config.provider'
import './blog.scss'

export default function BlogViewModule() {
  const client = useContext(BlogContext)
  const [blogPostPreviews, setBlogPostPreviews]: [PreviewBlogPostType[], any] = useState([])
  useEffect(() => {
    client.getEntries().then((entries: any) => {
      const blogPostList = entries.items.map((entry: ContentfulResponseType) => {
        return {
          header: entry.fields.header,
          previewImg: entry.fields.previewImage.fields.file.url,
          excerpt: documentToHtmlString(entry.fields.preview as any),
          postId: entry.sys.id,
        }
      })
      setBlogPostPreviews(() => blogPostList)
    })
  }, [])
  return (
    <div>{blogPostPreviews.length > 0 ? <Carousel items={blogPostPreviews}></Carousel> : null}</div>
  )
}
