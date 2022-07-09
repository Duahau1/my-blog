import React from 'react'
import './blog-post-author.scss'
export default function ContentNavMenu(props: any) {
  const { subHeadersCollection } = props
  return (
    <div>
      {subHeadersCollection.map((subHeader) => {
        return <div key={subHeader}>{subHeader}</div>
      })}
    </div>
  )
}
