import { Component } from 'react'
import { Link } from "react-router-dom"

const HTTP_Request = (url, type, headers = null, body) => {
	  return fetch(url, {
	    method: type,
	    headers: headers,
	    body: body
	   })  
}

const URL_SIGNUP = 'http://localhost:3001/api/v1/users'
const RESORT_URL = 'http://localhost:3001/api/v1/resorts'

let logIn_Headers = {
	"Accept":"application/json",
	"Content-Type":"application/json"
}

export class SignUpForm extends Component {
    constructor() {
      super();
      this.state = {
        name: '',
        email: '',
        password: '',
        error: '',
      };
      this.handleNameChange = this.handleNameChange.bind(this);  
      this.handlePassChange = this.handlePassChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.dismissError = this.dismissError.bind(this);
    }

    componentDidMount() {
      
      let { error } = this.props
      error && this.setState({ error })
    }

    authorization(callback) {

      let signUpDetails = {
        "name": this.state.name,          
        "email": this.state.email,
        "password": this.state.password        
      }

      let newUser = { "user": signUpDetails }  
      
      return HTTP_Request(URL_SIGNUP, "POST", logIn_Headers, JSON.stringify(newUser))
        .then(res => res.json())
        .then(res => {
  
              if (res.error) {
                for (var message in res.error) {
                  console.log('res ' + res.error[message]);
                  this.setState({ error: res.error[message] });
                }
              }
    
              if (res.id) {       
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
                    .catch(error => console.log(error))  		
              }            
           
        })      
    }    
  
    dismissError() {
      this.setState({ error: '' });
    }
  
    handleSubmit(evt) {
      evt.preventDefault();
  
      if (!this.state.name) {
        return this.setState({ error: 'Name is required' });
      }

      if (!this.state.email) {
        return this.setState({ error: 'Email is required' });
      }      

      else if (!this.state.password) {
        return this.setState({ error: 'Password is required' });
      }

      else {
        this.authorization()
      }
    }

    handleNameChange(evt) {
      this.setState({
        name: evt.target.value,
      });
    };

    handleEmailChange(evt) {
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
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            {
              this.state.error &&
              <h3 data-test="error" onClick={this.dismissError}>
                <button onClick={this.dismissError}>✖</button>
                {this.state.error}
              </h3>
            }

            <label>Name</label>
            <input type="text" data-test="name" value={this.state.name} onChange={this.handleNameChange} />

            <label>Email</label>
            <input type="text" data-test="email" value={this.state.email} onChange={this.handleEmailChange} />
  
            <label>Password</label>
            <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
  
            <input type="submit" value="Sign up" data-test="submit" />
          </form>
 
          <Link to='/'>Back</Link>          
        
        </div>
      );
    }
  }