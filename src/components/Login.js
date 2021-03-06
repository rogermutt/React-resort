import React, { Component } from 'react';

const URL_LOGIN = 'http://localhost:3001/authenticate'

const redirect = () => {
    const request = new Request('http://localhost:3001/api/v1/resorts', {
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      })
    })
    return fetch(request)
      
      .then(res => console.log(res))
      .catch(error => console.log(error))
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

export class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
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

    if (!this.state.email) {
      return this.setState({ error: 'email is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    let loginDetails = {        
      "email": this.state.email,
      "password": this.state.password        
    }


    login(loginDetails)

    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      email: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          <label>Email Address</label>
          <input type="text" data-test="email" value={this.state.email} onChange={this.handleUserChange} />

          <label>Password</label>
          <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

          <input type="submit" value="Log In" data-test="submit" />
        </form>
      </div>
    );
  }
}