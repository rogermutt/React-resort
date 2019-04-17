import Terrain from 'react-icons/lib/md/terrain'
import SnowFlake from 'react-icons/lib/ti/weather-snow'
import Calendar from 'react-icons/lib/fa/calendar'
import { PropTypes } from 'react'

export const SkiDayRow = ({id, name, date, 
							powder, backcountry, invvalue, deleteDay}) => (
	<tr>
		<td>{date}</td>
		<td>{name}</td>
		<td>{(powder) ? <SnowFlake/> : null}</td>
		<td>{(backcountry) ? <Terrain /> : null}</td>
		<td>$ {invvalue}</td>		
		<td>
			<form >
				<button onClick={ ev => {
					ev.preventDefault()
					 deleteDay(id)
				}} >{id}</button>
			</form>
		</td>
	</tr>						

)

SkiDayRow.propTypes = {
	name: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	powder: PropTypes.bool,
	backcountry: PropTypes.bool
}