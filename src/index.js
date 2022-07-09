import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrimaryNav from './components/primary-nav/tab.component'
import { BlogContext } from './providers/blog-config.provider'
import Footer from './components/footer/footer.component'
const ContentfulClientConfig = require('contentful').createClient({
  space: '6nhtwz7xrsza',
  accessToken: '8fBvxQC7YslY6ty4IW-yd9yLEoZSz-Pd8TGcXrjhfC8',
})
const BlogViewModule = React.lazy(() => import('./modules/Blog/blog.module'))
const BlogPostModule = React.lazy(() => import('./components/blog-post/blog-post.component'))
ReactDOM.render(
  <BrowserRouter>
    <PrimaryNav />
    <Routes>
      <Route exact path='/' element={<App />} />
      <Route
        path='blog'
        element={
          <React.Suspense fallback={<>...</>}>
            <BlogViewModule />
          </React.Suspense>
        }
      />
      <Route
        path='blog/:id'
        element={
          <BlogContext.Provider value={ContentfulClientConfig}>
            <React.Suspense fallback={<>...</>}>
              <BlogPostModule />
            </React.Suspense>
          </BlogContext.Provider>
        }
      />
    </Routes>
    <Footer />
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
