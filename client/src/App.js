import React, { Component } from 'react'
import Router from 'react-router-dom/BrowserRouter'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import { Home, Dashboard, DocumentDetails } from './pages'
import { SignUp, Toastify } from './components'

const PrivateOnlyRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      // Checking the access_token
      if (props.location.pathname === '/about') {
        return <Component {...props} />
      } else {
        return <Component {...props} />
      }
    }}
  />
)
const PublicOnlyRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
)
class ScrollToTop extends Component {
  render() {
    return this.props.children
  }
}

const RoutedScroll = withRouter(ScrollToTop)
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Toastify />
        <Router>
          <RoutedScroll>
            <Switch>
              <PublicOnlyRoute exact path="/" component={Home} />
              <PublicOnlyRoute exact path="/signup" component={Home} />
              <PrivateOnlyRoute exact path="/dashboard" component={Dashboard} />
              <PrivateOnlyRoute exact path="/dashboard/:tab/:tab2" component={DocumentDetails} />
              <PrivateOnlyRoute exact path="/dashboard/:tab/:tab2/:tab3" component={DocumentDetails} />
              <PrivateOnlyRoute exact path="/dashboard/document-details" component={DocumentDetails} />
              <PrivateOnlyRoute exact path="/dashboard/document-details/:tab" component={DocumentDetails} />
            </Switch>
          </RoutedScroll>
        </Router>
      </React.Fragment>
    )
  }
}

export default App
