import { Component } from 'react'
import { AppRouter } from './Router'

const RESORT_URL = 'http://localhost:3001/api/v1/resorts'

const SUBMIT_URL = 'http://localhost:3001/api/v1/resorts/1/submit' 

const URL_LOGIN = 'http://localhost:3001/authenticate'

const HEADERS = {
	'Authorization': localStorage.getItem('token')
}

let logIn_Headers = {
	"Accept":"application/json",
	"Content-Type":"application/json"
}

const HTTP_Request = (url, type, headers = null, body) => {
	  return fetch(url, {
	    method: type,
	    headers: headers,
	    body: body
	   })  
}

export class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			allSkiDays: [],
			isAuthenticated: false,
			loading: false
		}

		this.addDay = this.addDay.bind(this)
		this.deleteDay = this.deleteDay.bind(this)
		this.authenticate = this.authenticate.bind(this)
		this.signout = this.signout.bind(this)
		this.changeLoadStatus = this.changeLoadStatus.bind(this)
		this.previewDay = this.previewDay.bind(this)
		this.saveNewDay = this.saveNewDay.bind(this)
	}

    componentDidMount() {

		let token = localStorage.getItem('token') 

		if (token != null) {

			fetch(RESORT_URL, {
				headers: {
					'Authorization': token
				}
			})  				
			.then(res => res.json())					
			.then (allSkiDays => 
				this.setState({ 
					allSkiDays: allSkiDays,
					isAuthenticated: true 
					} // Not running callback here so user is not redirected to /dayList	
				)	
			)		
		}		
	}
	
	authenticate(isAuthenticated, allSkiDays) {

		isAuthenticated && this.setState({ 
			allSkiDays,
			isAuthenticated
			} 
		)

	}

	signout(cb) {
		this.setState({ 
			isAuthenticated: false
			}, ()=>{
				localStorage.removeItem('token')
				cb()	
			})	
	}
	
	changeLoadStatus () {
		this.setState(prevState => ({
			loading: !prevState.loading
		}));		
	}

	saveNewDay (newDay, callback) {

		let headers = {
			'Authorization': localStorage.getItem('token')
		}		

		let formData = new FormData();		

		for (let [key, value] of Object.entries(newDay)) {
			formData.append(key, value);
		}				

		HTTP_Request(RESORT_URL, 'POST', headers, formData)	
		.then(res=>res.json())
		.then(newDay => {

				this.setState({ 
					allSkiDays: [...this.state.allSkiDays, newDay] }, ()=>{
						console.log(newDay)	

						this.setState({ 
							loading: false
						})
						// this.changeLoadStatus()
						localStorage.removeItem('newDay')
						localStorage.removeItem('invoice_value')			
						callback
					}
				)		
		})

	}			

	previewDay (invoice_data, callback) {

			let headers = {
				'Authorization': localStorage.getItem('token')
			}

			HTTP_Request(SUBMIT_URL, 'POST', headers, invoice_data)	
			.then(res=>res.json())
			.then(newDay => {
					localStorage.setItem('invoice_value', JSON.stringify(newDay.invoice_value))
			}).then(() => {
				this.changeLoadStatus()
				callback
			})	
	}

	addDay(newDay, cb) {


		this.changeLoadStatus()

		let invoiceFile = document.getElementById('invoice').files[0]

		localStorage.setItem('newDay', JSON.stringify(newDay))

		let formWithInvoice = new FormData();		

		formWithInvoice.append('invoice', invoiceFile);
	
		this.previewDay (formWithInvoice, cb)
	
	}

	deleteDay(idToDelete) {

		let headers = {
			'Authorization': localStorage.getItem('token')
			}

			HTTP_Request(`${RESORT_URL}/${idToDelete}`, 'DELETE', headers, null)
			.then(() => {
				let filteredState = this.state.allSkiDays.filter(day => day.id !== idToDelete)
				this.setState({allSkiDays: filteredState})					
			}).catch(error => console.log(error))			
	}

	getDayList() {

		// not beign used atm

		HTTP_Request(RESORT_URL, 'GET', HEADERS, null)
		.then( response => response.json())	
		.catch(error => console.log(error)) 		
		
	}
	
	countDays(filter) {
		const { allSkiDays } = this.state
		return allSkiDays.filter(
			(day) => (filter) ? day[filter] : day).length
	}


  render () {

		return this.state.loading ? 
				
				(<div className="app" >
						<div>Loading...</div>
						<p>In the back end > resorts controller > lines 33 to 38 make the delay</p>					
					</div>
				)	: (
							<div className="app" >
									<AppRouter 
										authState={this.state.isAuthenticated} 
										auth={this.authenticate}
										signout={this.signout}
										daylist={this.state.allSkiDays}
										onNewDay={this.addDay}
										saveNewDay={this.saveNewDay}
										deleteDay={this.deleteDay}
										skiDayCount={{
											total: this.countDays(), 
											powder:this.countDays( "powder" ),
											backcountry:this.countDays( "backcountry" )
										}}
									/>
						</div>
						)
    }	
}




