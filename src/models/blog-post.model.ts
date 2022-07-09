export type BlogPostContentType = {
  content: {
    data: object
    marks: any[]
    nodeType: string
    value: string
  }[]
}
export type ContentfulSysMetadataType = {
  sys: { id: string; linkType: string; type: string }
}
export type ContentfulMetadataType = {
  contentType: ContentfulSysMetadataType
  createdAt: string
  environment: ContentfulSysMetadataType
  id: string
  locale: string
  revision: number
  space: ContentfulSysMetadataType
  type: string
  updatedAt: string
}
export type BlogPostResponseType = {
  header: string
  landing: {
    fields: {
      description: string
      file: { url: string; contentType: string; fileName: string }
      title: string
    }
    metadata?: { tags: string[] }
  }
  preview: { content: BlogPostContentType[]; data: any; nodeType: string }
  previewImage: {
    fields: {
      description: string
      file: { url: string; contentType: string; fileName: string }
      title: string
    }
    metadata?: { tags: string[] }
  }
  text: {
    content: BlogPostContentType[]
    data: any
    nodeType: string
  }
}
export type ContentfulResponseType = {
  fields: BlogPostResponseType
  metadata: { tags: string[] }
  sys: ContentfulMetadataType
}

export type BlogPostInquiryType = {
  header: string
  landingImg: string
  landingAlt: string
  releasedTime: string
  author: 'duahau1'
}
export type PreviewBlogPostType = {
  header: string
  previewImg: string
  excerpt: string
  postId: string
}
