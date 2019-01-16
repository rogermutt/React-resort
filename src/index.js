
import { render } from 'react-dom'
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from "react-router-dom";

import './stylesheets/ui.scss'


const URL_LOGIN = 'http://localhost:3001/authenticate'

const LOGIN_DETAILS = {
    "email": 'r@r.com',
    "password": '123456'
}


function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {

    return fetch(URL_LOGIN, {
        method: "POST",
        headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
        },
        body: JSON.stringify(LOGIN_DETAILS)
    })
      .then(res => res.json())
      .then(res => {
		  
		  if (res.auth_token) {			  
			  localStorage.setItem('token', res.auth_token)
			  this.isAuthenticated = true
			  cb()
		  }
		  
		})      
      .catch(error => console.log(error))		
  },
  signout(cb) {
	this.isAuthenticated = false;
	localStorage.removeItem('token');
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function Public() {
  return <h3>Public</h3>;
}

function Protected() {
  return <h3>Protected</h3>;
}

class Login extends React.Component {
  state = { redirectToReferrer: false };
  

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

window.React = React

render(
	<AuthExample/>,
	document.getElementById('react-container')
)