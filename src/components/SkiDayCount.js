import { Component } from 'react'
import '../stylesheets/ui.scss'
import Terrain from 'react-icons/lib/md/terrain'
import SnowFlake from 'react-icons/lib/ti/weather-snow'
import Calendar from 'react-icons/lib/fa/calendar'
import { PropTypes } from 'react'

const percentToDecimal = (decimal) => {
	return ((decimal * 100) + '%')
}

// The below to be recalculated so it's % of invoices submitted vs approved (which will be either powder or backcountry)
const calcGoalProgress = (total, goal) => {
	return percentToDecimal(total/goal)
}

export class SkiDayCount extends Component {

    render () {
			
		let { total, powder, backcountry } = this.props.skiDayCount

		let goal=100
        
        return (
			<div className="ski-day-count">
			<div className="total-days">
				<span>{total}</span>
					<Calendar />
				<span>days</span>
			</div>
			<div className="powder-days">
				<span>{powder}</span>
					<SnowFlake />
				<span>days</span>
			</div>
			<div className="backcountry-days">
				<span>{backcountry}</span>
					<Terrain />
				<span>days</span>
			</div>
			<div>
				<span>
					{calcGoalProgress(
						total, 
						goal
					)}
				</span>
			</div>
		</div>
        )
    }

}

SkiDayCount.propTypes = {
  total: PropTypes.number,
  powder: PropTypes.number,
  backcountry: PropTypes.number,
  goal: PropTypes.number
}


