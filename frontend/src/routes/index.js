import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Redirect from '../pages/Redirect'
import Stats from '../pages/Stats'
import NotFound from '../pages/NotFound'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:code" component={Redirect} />
        <Route path="/:code/stats" component={Stats} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default Routes