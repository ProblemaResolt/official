import React from 'react'
import ReactDOM from 'react-dom/client'
import { Page } from '../src/stories/Pages/Page'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)
