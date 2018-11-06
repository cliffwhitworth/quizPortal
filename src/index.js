import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import reducers from './reducers';
import App from './components/App';
import Help from './components/Help';
import Welcome from './components/Welcome';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Footer from './components/Footer';
import Nav from './components/Nav';

import QuizByID from './components/quiz/QuizByID';

const store = createStore(
  reducers,
  {
    auth: { token: localStorage.getItem('token'), username: localStorage.getItem('username') }
  },
  applyMiddleware(reduxThunk)
);

const mySignin = props => {
  return (
    <Signin
      locationPath='Signin'
      {...props}
    />
  );
};

const myNav = ({ match, props }) => {
  return (
    <Nav
      locationPath={match.params.id}
      {...props}
    />
  )
}

const mySignout = props => {
  return (
    <Signout />
  )
}

const GoHome = () => {
  return(
    <Redirect to="/home" />
  )
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="col-md-8 mx-auto">
        <Route path="/:id" component={myNav} />
        <App>
          <Route path='/' exact component={GoHome} />
          <Route path='/home' component={Welcome} />
          <Route path='/register' component={Register} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/signout' component={mySignout} />
          <Route path='/signin' component={mySignin} />
          <Route path='/help' component={Help} />
          <Route path='/quizbyid' component={QuizByID} />
        </App>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
