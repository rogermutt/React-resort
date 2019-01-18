import Terrain from 'react-icons/lib/md/terrain'
import SnowFlake from 'react-icons/lib/ti/weather-snow'
import Calendar from 'react-icons/lib/fa/calendar'
import { SkiDayRow } from './SkiDayRow'
import { PropTypes } from 'react'
import { Link } from 'react-router-dom'

const dayFilter = (days, filter = null) => {
	return filter === null ? days : days.filter(day => day[filter])
}
		
export const SkiDayList = props => {

	let days = props.days

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
						<Link to='/list-days'>All Days</Link>
						<Link to='/list-days/powder'>Powder</Link>
						<Link to='/list-days/backcountry'>Backcountry</Link>
					</td>
				</tr>
			</thead>
			<tbody>
				{days.map((day, i) =>
					<SkiDayRow key={i}
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














