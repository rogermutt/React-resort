import { Component } from 'react'
import { SkiDayList } from './SkiDayList'
import { SkiDayCount } from './SkiDayCount'
import { AddDayForm } from './AddDayForm'
import { Menu } from './Menu'
import { MemberList } from './MemberList'

const URL_API = 'http://localhost:3001/api/v1/resorts'

export class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			allSkiDays: []
		}

		this.addDay = this.addDay.bind(this)
		this.deleteDay = this.deleteDay.bind(this)
	}

    componentDidMount() {
        fetch(URL_API)
        .then( response => response.json() )
        .then ( allSkiDays => this.setState({
            allSkiDays
        }))
    }	

	addDay(newDay) {
		fetch(URL_API, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'X-User-Email': 'ro@ro.com',
			  'X-User-Token': 'qvaaHp9UqeV-Fibfpd6X'
			},
			body: JSON.stringify(newDay)
		  }).then(res=>res.json())
			.then(newDay => {
				this.setState({ 
					allSkiDays: [...this.state.allSkiDays, newDay]}, res => console.log(res)
				  );	
			});			
	}

	deleteDay(idToDelete) {

		let { allSkiDays } = this.state

		if (idToDelete === undefined) {

			let last = allSkiDays[allSkiDays.length -1]

				console.log("unedefined > last id: " + allSkiDays.length);
			
			let filteredState = allSkiDays.filter(day => day !== last)

			this.setState({allSkiDays: filteredState}, ()=> {
				console.log("undefined removed");	
			})

		// let excludeDayToDelete = this.state.allSkiDays.filter(day => day.id != idToDelete)

		// this.setState({ 
		// 	allSkiDays: excludeDayToDelete },
		// 	() => {
		// 		console.log("DELETE request");

		// 		fetch(`${URL_API}/${allSkiDays.length}`, {
		// 			method: 'DELETE',
		// 			headers: {
		// 			  'Content-Type': 'application/json',
		// 			  'X-User-Email': 'ro@ro.com',
		// 			  'X-User-Token': 'qvaaHp9UqeV-Fibfpd6X'
		// 			}
		// 		  }).then(res => console.log(res))
		// 		  	.catch(error => console.log(error))						
		// 	}
		//   );				
			
	 

		} else {
			console.log("id exists " + idToDelete);
 


		}
			
	}

	countDays(filter) {
		const { allSkiDays } = this.state
		return allSkiDays.filter(
			(day) => (filter) ? day[filter] : day).length
	}

	render() {
		return (
			<div className="app">
				<Menu/>

				{ 
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
				}
			</div>
		)
	}
}




