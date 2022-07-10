import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import CloseIcon from '@mui/icons-material/Close'
import { CardContent, CardHeader, CardMedia, IconButton } from '@mui/material'
import Card from '@mui/material/Card'
import Snackbar from '@mui/material/Snackbar'
import hljs from 'highlight.js'
import _ from 'lodash-es'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BlogPostInquiryType, ContentfulResponseType } from '../../models/blog-post.model'
import { BlogContext } from '../../providers/blog-config.provider'
import { ISOtoLocaleString } from '../../utils/date.utils'
import ContentAuthor from './blog-post-author.component'

export default function ContentProvider(props: any) {
  const client = useContext(BlogContext)
  const { state }: any = useLocation()
  const blogPostContentRef = useRef(null)
  const [blogPostState, setBlogPostState]: [
    BlogPostInquiryType | Partial<BlogPostInquiryType>,
    any,
  ] = useState({})
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [header, setHeader] = useState([])
  const options = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: any) => {
        const headerValue = _.values(_.mapValues(node.content, 'value')).join('')
        setHeader((val) => [...val, headerValue])
        return `<h2 data-header="${headerValue}">${headerValue}</h2>`
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        return `<img class='inline-img' src=${node.data.target.fields.file.url} alt="content-img"/>`
      },
      [INLINES.HYPERLINK]: (node: any) => {
        const hyperlinkContent = node.content.reduce((prev, cur) => prev + ' ' + cur.value, '')
        const VIDEOLINK = 'LINKS_TO_BE_CONVERTED_TO_VIDEO'

        if (hyperlinkContent.trim() === VIDEOLINK) {
          return `
      <iframe width="100%" height="500" src=${node.data.uri} ></iframe>
      `
        } else {
          return `<a className-="inline-hyperlink"src=${node.data.uri}>${hyperlinkContent}</a>`
        }
      },
    },
  }
  const handleClose = () => {
    setSnackBarOpen(false)
  }
  const action = (
    <React.Fragment>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  )
  useEffect(() => {
    client
      .getEntry(state.id)
      .then((entry: ContentfulResponseType) => {
        const rawRichTextField = entry.fields.text
        setBlogPostState(() => {
          return {
            header: entry.fields.header,
            landingImg: entry.fields.landing.fields.file.url,
            landingAlt: entry.fields.landing.fields.file.fileName,
            releasedTime: entry.sys.createdAt,
            author: 'duahau1',
          }
        })
        return documentToHtmlString(rawRichTextField as any, options)
      })
      .then((renderedHtml: string) => {
        if (renderedHtml != null) {
          const blogPostContainer: HTMLElement = blogPostContentRef.current
          blogPostContainer.innerHTML = renderedHtml ?? ''
          blogPostContainer.querySelectorAll('code').forEach((codeElement: HTMLElement) => {
            if (codeElement.previousSibling == null) {
              const copySvgIcon = document.createElement('img')
              copySvgIcon.setAttribute('src', copySvg)
              copySvgIcon.classList.add('copyToClipboard')
              codeElement.classList.add('codeContainer')
              hljs.highlightElement(codeElement)
              codeElement.prepend(copySvgIcon)
              copySvgIcon.addEventListener('click', () => {
                navigator.clipboard.writeText(codeElement.innerText)
                setSnackBarOpen(true)
              })
            } else {
              codeElement.classList.add('codeShortContainer')
              hljs.highlightElement(codeElement)
            }
          })
        }
      })
  }, [])
  return (
    <Card className='blog-post-container'>
      <CardMedia
        component='img'
        className='blog-post-landing-page-img'
        alt={blogPostState.landingAlt}
        image={blogPostState.landingImg}
      />
      <CardHeader className='blog-post-header' title={blogPostState.header}></CardHeader>
      <CardContent>
        {/* <ContentNavMenu subHeadersCollection={header}></ContentNavMenu> */}

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackBarOpen}
          autoHideDuration={4000}
          message='Copied'
          onClose={handleClose}
          action={action}
        />
        {blogPostState.releasedTime ? (
          <ContentAuthor>
            <h4 className='blog-post-metadata'>
              {ISOtoLocaleString(blogPostState.releasedTime)}, by {blogPostState.author}{' '}
            </h4>
          </ContentAuthor>
        ) : (
          ''
        )}
        <div className='blog-post-content' ref={blogPostContentRef}></div>
      </CardContent>
    </Card>
  )
}
