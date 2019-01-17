
import { render } from 'react-dom'
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from "react-router-dom";

import { AddDayForm } from './components/AddDayForm'

const URL_API = 'http://localhost:3001/api/v1/resorts'

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
        <PrivateRoute path="/protected" component={AddDayForm} />
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

function login (loginParams) {  
    return fetch(URL_LOGIN, {
        method: "POST",
        headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
        },
        body: JSON.stringify(loginParams)
    })
      .then(res => res.json())
      .then(res => localStorage.setItem('token', res.auth_token))      
      .then(res => redirect()

      )
      .catch(error => console.log(error))			
  }

  const HEADERS = {
	'Authorization': localStorage.getItem('token')
  }  


const PostData = (url, type, headers = null, body) => {
	return fetch(url, {
		method: type,
		headers: headers,
		body: body
	  })	
}

function getDayList(){
	
	return PostData(URL_API, 'GET', HEADERS, null)
	.then( response => response.json() )
	.then( res => res.map(el=> console.log('el ' + el.name)) )
	.catch(error => console.log(error))	
}


class Login extends React.Component {

	constructor() {
		super();
		this.state = {
		  username: '',
		  password: '',
		  error: '',
		  redirectToReferrer: false
		};
	
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.dismissError = this.dismissError.bind(this);
	  }

	  dismissError() {
		this.setState({ error: '' });
	  }
	
	  handleSubmit(evt) {
		evt.preventDefault();

		if (!this.state.username) {
		  return this.setState({ error: 'Username is required' });
		}
	
		if (!this.state.password) {
		  return this.setState({ error: 'Password is required' });
		}

		fakeAuth.authenticate(() => {
			this.setState({ redirectToReferrer: true });
			getDayList()
		  });			
	
		return this.setState({ error: '' });
	  }
	
	  handleUserChange(evt) {
		this.setState({
		  username: evt.target.value,
		});
	  };
	
	  handlePassChange(evt) {
		this.setState({
		  password: evt.target.value,
		});
	  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (

      <div className="Login">
	  <p>You must log in to view the page at {from.pathname}</p>
	  <form onSubmit={this.handleSubmit}>
		{
		  this.state.error &&
		  <h3 data-test="error" onClick={this.dismissError}>
			<button onClick={this.dismissError}>✖</button>
			{this.state.error}
		  </h3>
		}
		<label>User Name</label>
		<input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />

		<label>Password</label>
		<input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

		<input type="submit" value="Log In" data-test="submit" />
	  </form>
	</div>

    );
  }
}

window.React = React

render(
	<AuthExample/>,
	document.getElementById('react-container')
)