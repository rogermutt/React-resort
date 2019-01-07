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
	}

    componentDidMount() {
        fetch(URL_API)
        .then( response => response.json() )
        .then ( allSkiDays => this.setState({
            allSkiDays
        }))
    }	

	addDay(newDay) {

		this.setState({ 
			allSkiDays: [...this.state.allSkiDays, newDay] },
			() => console.log('Day added')
		  );	

		  fetch(URL_API, {
			method: 'post',
			headers: {
			  'Content-Type': 'application/json',
			  'X-User-Email': 'ro@ro.com',
			  'X-User-Token': 'qvaaHp9UqeV-Fibfpd6X'
			},
			body: JSON.stringify(
				{
					"id": 8,
					"name": "BCN",
					"date": "05/05/2017",
					"powder": false,
					"backcountry": true
				}
			)
		  }).then(res=>res.json())
			.then(res => console.log(res));		  
		  

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
							: <SkiDayList days={this.state.allSkiDays} filter={this.props.params.filter} />  
				}
			</div>
		)
	}
}




