import React, { Component} from 'react';
import { connect } from 'react-redux';
import setdate from '../actions/setdate';
import setweek from '../actions/setweek';
import DayColumn from './DayColumn';
let weekOffset = 0

class Schedule extends Component {
	constructor(props) {
		super(props);

		this.setWeekBack = this.setWeekBack.bind(this)
		this.setCurrent = this.setCurrent.bind(this)
		this.setWeekForward = this.setWeekForward.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(setdate());
	}

	setWeekBack() {
		weekOffset += 1
		this.props.dispatch(setweek(weekOffset));

	}

	setCurrent() {
		weekOffset = 0
		this.props.dispatch(setweek(weekOffset));
	}

	setWeekForward() {
		weekOffset -= 1
		this.props.dispatch(setweek(weekOffset));
	}

	render() {
		return(
			<div style={styles.scheduleBox} className="row">
				<button type='button' className='btn grey darken-1' onClick={this.setWeekBack}>&lt;&lt;</button>&nbsp;
				<button type='button' className='btn grey darken-1' onClick={this.setCurrent}>Current</button>&nbsp;
				<button type='button' className='btn grey darken-1' onClick={this.setWeekForward}>&gt;&gt;</button>
				<div style={styles.employeeColumn} className="col s3 m2"></div>
				<div style={styles.calendarWindow} className="col s9 m10">
					<div style={styles.calendar}>
						<DayColumn day="0" />
						<DayColumn day="1" />
						<DayColumn day="2" />
						<DayColumn day="3" />
						<DayColumn day="4" />
						<DayColumn day="5" />
						<DayColumn day="6" />
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	scheduleBox: {
		width: '100%',
		height: '500px',
		backgroundColor: '#aaa'
	},
	employeeColumn: {
		backgroundColor: "#aaa",
		height: '100%',
	},
	calendarWindow: {
		height: '100%',
		overflow: 'scroll'
	},
	calendar: {
		width: '1585px',
		height: '100%'
	}
}

export default connect()(Schedule);
