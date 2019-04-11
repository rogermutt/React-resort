import { Component } from 'react'
import { Link } from "react-router-dom"

const HTTP_Request = (url, type, headers = null, body) => {
	  return fetch(url, {
	    method: type,
	    headers: headers,
	    body: body
	   })  
}

const RESORT_URL = 'http://localhost:3001/api/v1/resorts'

const URL_LOGIN = 'http://localhost:3001/authenticate'

let logIn_Headers = {
	"Accept":"application/json",
	"Content-Type":"application/json"
}

export class LoginForm extends Component {
    constructor() {
      super();
      this.state = {
        username: '',
        password: '',
        error: '',
      };
  
      this.handlePassChange = this.handlePassChange.bind(this);
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.dismissError = this.dismissError.bind(this);
    }

    componentDidMount() {
      
      let { error } = this.props
      error && this.setState({ error })
    }

    authorization(callback) {


      let loginDetails = {
        "email": this.state.username,
        "password": this.state.password
      }
  
      return HTTP_Request(URL_LOGIN, "POST", logIn_Headers, JSON.stringify(loginDetails))
        .then(res => res.json())
        .then(res => {
  
            if (res.error) 
            this.setState({ error: "The email or password are incorrect" });
  
            if (res.token) {     
  
                localStorage.setItem('token', res.token) 
                fetch(RESORT_URL, {
                    headers: {
                      'Authorization': localStorage.getItem('token')
                    }
                })  				
                .then(res => res.json())					
                .then (allSkiDays => {

                  this.props.auth(true, allSkiDays)
                  this.props.history.push("/dayList")
      
                })		
              }
        
          })      
          .catch(error => console.log(error))  
                     
    }    
  
    dismissError() {
      this.setState({ error: '' });
    }
  
    handleSubmit(evt) {
      evt.preventDefault();
  
      if (!this.state.username) {
        return this.setState({ error: 'Username is required' });
      }

      else if (!this.state.password) {
        return this.setState({ error: 'Password is required' });
      }

      else {
        this.authorization()
      }
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
  
      return (
        <div className="login">
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

          <Link to='/'>Back</Link>          
        
        </div>
      );
    }
  }