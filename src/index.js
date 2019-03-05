import 'babel-polyfill'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import store from './store/store'
import {Provider} from 'react-redux'
import {clearError} from './utilities/constants'
import Root from './components/common/Root'
import './styles/main.css';

import App from './components/App'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import EventsPage from './components/EventsPage'
import NotFound from './components/NotFound'

/**
* Checks authentication status on route change
* @param  {object}   nextState The state we want to change into when we change routes
* @param  {function} replace Function provided by React Router to replace the location
*/
function checkAuth (nextState, replace) {
  const {loggedIn} = store.getState();
  store.dispatch(clearError())
 
   
  // Check if the path isn't dashboard. That way we can apply specific logic to
  // display/render the path we want to
  if (nextState.location.pathname !== '/eventsPage') {
    console.log('not eventspage')
    if (loggedIn) {
      console.log('logedin')
      if (nextState.location.state && nextState.location.pathname) {
        console.log('next stage')
        replace(nextState.location.pathname)
      } else {
        console.log('next troot')

        replace('/')
      }
    }
  } else {
    // If the user is already logged in, forward them to the homepage
    if (!loggedIn) {
      console.log('no login stage')

      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname)
      } else {
        replace('/')
      }
    }
    console.log('asdsad stage')

  }
  console.log('nexaaaaat stage')

}

// Mostly boilerplate, except for the routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
class LoginPage extends Component {
  
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Route component={App}>
          
          <Root>
            <Switch>
          <Route path='/' component={Home} />
          <Route onEnter={checkAuth}>
          <Root>
            <Switch>
              <Route path='/login' component={Login} />
            
              <Route path='/register' component={Register} />
            
              <Route path='/eventsPage' component={EventsPage} />
            
              <Route path='*' component={NotFound} />
              </Switch>
              </Root>
            </Route>
            </Switch>
            </Root>
          </Route>
          
        </Router>

      </Provider>
    )
  }
}

ReactDOM.render(<LoginPage />, document.getElementById('loginPage'))
