import { Component } from 'react'
import { Menu } from './Menu'
import { AppRouter } from './Router'

const URL_API = 'http://localhost:3001/api/v1/resorts'

const URL_LOGIN = 'http://localhost:3001/authenticate'
const HEADERS = {
	'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE1NDcyOTI3Mjh9.vu6tw94sLM-VmICexrbjnJGJpXCaPrD5dwz8TlEVdEE'
}

const LOGIN_DETAILS = {
    "email": 'r@r.com',
    "password": '123456'
}


const PostData = (url, type, body) => {
	return fetch(url, {
		method: type,
		headers: HEADERS,
		body: body
	  })	
}

export class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			allSkiDays: [],
			isAuthenticated: false
		}

		this.addDay = this.addDay.bind(this)
		this.deleteDay = this.deleteDay.bind(this)
		this.authenticate = this.authenticate.bind(this)
	}

    componentDidMount() {

		let loggedIn = localStorage.getItem('token') ? true : false 

		this.setState({ isAuthenticated: loggedIn })		

        // fetch(URL_API)
        // .then( response => response.json() )
        // .then ( allSkiDays => this.setState({
        //     allSkiDays
		// }))		
		
	}
	
	authenticate(callback) {
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
			this.setState( { isAuthenticated: true }, callback() );	
			console.log(this.state.isAuthenticated);
	      }
	    })      
		  .catch(error => console.log(error))   
	  }

	  signout(cb) {
	  this.state.isAuthenticated = false;
	  localStorage.removeItem('token');
		setTimeout(cb, 100);
	  }	

	addDay(newDay) {
		PostData(URL_API, 'POST', JSON.stringify(newDay))		  
		  .then(res=>res.json())
		  .then(newDay => {
			this.setState({ 
				allSkiDays: [...this.state.allSkiDays, newDay]}, 
				() => console.log(newDay)
				);	
		  });			
	}

	deleteDay(idToDelete) {

			PostData(`${URL_API}/${idToDelete}`, 'DELETE', null)
			.then(() => {
				let filteredState = this.state.allSkiDays.filter(day => day.id !== idToDelete)
				this.setState({allSkiDays: filteredState})					
			}).catch(error => console.log(error))			
	}

	countDays(filter) {
		const { allSkiDays } = this.state
		return allSkiDays.filter(
			(day) => (filter) ? day[filter] : day).length
	}

	render() {
		return (
			<div className="app">
				<AppRouter authState={this.state.isAuthenticated} auth={this.authenticate}/>

				{/* {
					(this.props.location.pathname === '/')
					?  <SkiDayCount 
							total={this.countDays()}
							powder={this.countDays( "powder" )}
							backcountry={this.countDays( "backcountry" )}
						/>
					: (this.props.location.pathname === '/add-day') 
						? <AddDayForm onNewDay={this.addDay} />
						: (this.props.location.pathname === '/members') 
							? <MemberList />
							: <SkiDayList 
								days={this.state.allSkiDays} 
								filter={this.props.params.filter} 
								deleteDay={this.deleteDay}
								/>  
				} */}
			</div>
		)
	}
}




