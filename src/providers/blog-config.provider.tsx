import React from 'react'

const ContentfulClientConfig = require('contentful').createClient({
  space: '6nhtwz7xrsza',
  accessToken: '8fBvxQC7YslY6ty4IW-yd9yLEoZSz-Pd8TGcXrjhfC8',
})
export const BlogContext = React.createContext(ContentfulClientConfig)
