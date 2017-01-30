import React, { Component} from 'react';
import { connect } from 'react-redux';
import ShiftBox from './ShiftBox';
import ScheduleShiftBox from './ScheduleShiftBox';
import { totalhours } from '../actions/totalhours';

class DayColumn extends Component {
	constructor(props) {
		super(props);
		
		this.columnCheck = this.columnCheck.bind(this);
	}

	componentDidUpdate() {
		this.columnCheck();
	}

	myDate() {

		let dayOffset = this.props.setdate - this.props.day;
		let fullDate = new Date(Date.now()-((dayOffset * 24)*60*60*1000));
		let myDate = []

		myDate.push(fullDate.toDateString().substr(0, 3))
		let monthNumber = fullDate.getMonth();
		let monthNames = ["January", "February", "March", "April",
											"May", "June", "July", "August", "September",
											"October", "November", "December"]
		myDate.push(monthNames[monthNumber] + ' ' + fullDate.getDate())
		myDate.push(fullDate.getFullYear())

		return myDate
	}

	addEmployeeRow(myDate) {
		let month = myDate[1]
		let year = myDate[2]
		let employees = this.props.setemployee
		let day = myDate[0]
		let highlightRow = 0
		if(employees.length != 0) {
			if(document.location.pathname === "/shiftschedule") {
				return employees.map( e => {
					highlightRow += 1
					let highlight = highlightRow % 2
	        return(
	        	<ScheduleShiftBox key={this.props.day + "-" + e.id} day={day} month={month} year={year} id={e.id} highlight={highlight} />
	        )
				})
			} else {
	      return employees.map( e => {
	      	highlightRow += 1
					let highlight = highlightRow % 2
	        return(
	        	<ShiftBox key={this.props.day + "-" + e.id} day={day} month={month} year={year} id={e.id} highlight={highlight} />
	        )
				})
			}
		}
	}

	columnCheck() {
		if (this.props.day === "6") {
			let currentShifts = this.props.currentshifts
			this.props.dispatch(totalhours(currentShifts));
		}
	}

	render() {
		let myDate = this.myDate();
		return (

			<div style={styles.leftFloat}>
				{ this.addEmployeeRow(myDate) }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	let { setdate, setemployee, currentshifts } = state;
  return { setdate, setemployee, currentshifts }
}

const styles = {
	dateBox: {
		width: "225px",
		height: "40px",
		border: "1px solid #333",
		backgroundColor: "#666",
		background: "linear-gradient(#999, #333)",
		position: "relative"
	},
	dateBoxToday: {
		backgroundColor: "#66f",
		background: "linear-gradient(#1b7ff2, #1257a6)",
	},
	dayText: {
		fontWeight: "bold",
		fontSize: "49px",
		color: "#fff",
		opacity: "0.25",
		position: "absolute",
		bottom: "-20px",
		left: "0"
	},
	dateText: {
		fontWeight: "bold",
		fontSize: "22px",
		color: "#fff",
		position: "absolute",
		bottom: "-8px",
		right: "1px",
		textShadow: "0 0 10px rgba(0,0,0,0.35)"
	},
	yearText: {
		fontWeight: "bold",
		fontSize: "20px",
		color: "#000",
		opacity: "0.15",
		position: "absolute",
		top: "-7px",
		right: "0"
	},
	shiftDayText: {
		fontWeight: "bold",
		fontSize: "18px",
		color: "#000",
		opacity: "0.10",
		position: "absolute",
		bottom: "0px",
		right: "2px",
		transform: "rotate(-35deg)"
	},
	leftFloat: {
		float: 'left'
	},
	shiftBox: {
		width: "225px",
		height: "40px",
		border: "1px solid #666",
		backgroundColor: "#999",
		position: "relative"
	}
}

export default connect(mapStateToProps)(DayColumn);
