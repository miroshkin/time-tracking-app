import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import Projects from './Projects'
import Contact from './contact'

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/projects/:projectId" component={Projects} />
      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))
