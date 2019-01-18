import Terrain from 'react-icons/lib/md/terrain'
import SnowFlake from 'react-icons/lib/ti/weather-snow'
import Calendar from 'react-icons/lib/fa/calendar'
import { SkiDayRow } from './SkiDayRow'
import { PropTypes } from 'react'
import { Link } from 'react-router-dom'

const dayFilter = (days, pathname) => {
	let filter = pathname ? (pathname == 'dayList' ? null : pathname) : null 
	// Check filter != undefined, null. If that's the case check if == daylist. Else means is powder or backcountry
	return filter === null ? days : days.filter(day => day[filter])
}
		
export const SkiDayList = ({days, deleteDay}) => {

	let { pathname } = window.location
	let filter = pathname.split('/').slice(-1)[0]
	let filteredDays = dayFilter(days, filter)

	return (
		<table>
			<thead>
				<tr>
					<th>Date</th>
					<th>Resort</th>
					<th>Powder</th>
					<th>Backcountry</th>
				</tr>
				<tr>
					<td colSpan={4}>
						<Link to='/dayList'>All Days</Link>
						<Link to='/dayList/powder'>Powder</Link>
						<Link to='/dayList/backcountry'>Backcountry</Link>
					</td>
				</tr>
			</thead>
			<tbody>
				{filteredDays.map((day, i) =>
					<SkiDayRow key={i} deleteDay={deleteDay}
							{...day}/>	
					)}
			</tbody>
		</table>
	)
}

SkiDayList.propTypes = {
	days: function(props) {
		if(!Array.isArray(props.days)) {
			return new Error(
				"SkiDayList should be an array"	
				)
		} else if(!props.days.length) {
			return new Error(
				"SkiDayList must have at least one record"
				)
		} else {
			return null
		}
	}
}














