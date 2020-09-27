import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Dashboard from './screens/Dashboard'
import NewTask from './screens/NewTask'

function MainApp() {
  return (
    <HashRouter>
      <Switch>
        <Route component={Dashboard} exact path="/" />
        <Route component={NewTask} exact path="/nuevo" />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  )
}

export default MainApp
