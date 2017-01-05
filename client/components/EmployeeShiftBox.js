import React from 'react';
import { connect } from 'react-redux'
import { showshift } from '../actions/showshift'
import { currentshifts } from '../actions/currentshifts'

class EmployeeShiftBox extends React.Component {
	constructor(props) {
		super(props)

	}

	componentDidMount() {
		let employeeId = this.props.id
		let shiftdate = `${this.props.month}, ${this.props.year}`
	}


	rowHighlight() {
		if(this.props.highlight === 0) {
			return styles.shiftBox
		} else {
			return styles.shiftBoxHighlight
		}
	}

	shiftHighlight() {
		if(this.props.highlight === 0) {
			return styles.hasShift
		} else {
			return styles.hasShiftHighlight
		}
	}

	durationCheck(duration) {
		if (duration < 0) {
			return styles.durationError
		} else {
			return styles.shiftDuration
		}
	}

	display() {
		let day = this.props.day
		let date = `${this.props.month}, ${this.props.year}`
		let shifts = this.props.currentshifts
		let shiftMatch = false
		if(this.props.currentshifts.length != 0) {
			for (var i = 0; i < this.props.currentshifts.length; i++) {
				if (shifts[i].day === date && shifts[i].user_id === this.props.id) {
					shiftMatch = true;
					let shiftStartHour = shifts[i].start.substr(0,2)
					let shiftStartMinute = shifts[i].start.substr(3,2)
					let startMeridiem = 'AM'
					if (shiftStartHour > 12) {
						shiftStartHour -= 12
						startMeridiem = 'PM'
					}
					if(shiftStartHour == 0){
						shiftStartHour = 12
					}
					if(shiftStartHour < 10) {
						shiftStartHour -= 0
					}
					let shiftEndHour = shifts[i].end.substr(0,2)
					let shiftEndMinute = shifts[i].end.substr(3,2)
					let endMeridiem = 'AM'
					if (shiftEndHour > 12) {
						shiftEndHour -= 12
						endMeridiem = 'PM'
					}
					if(shiftEndHour == 0){
						shiftEndHour = 12
					}
					if(shiftEndHour < 10) {
						shiftEndHour -= 0
					}

					let durationHours = Math.floor(shifts[i].duration / 60)
					let durationMinutes = (shifts[i].duration % 60)
					return (
						<div style={this.shiftHighlight()}>
							<span style={styles.shiftTimes}>{`${shiftStartHour}:${shiftStartMinute} ${startMeridiem}`} - {`${shiftEndHour}:${shiftEndMinute} ${endMeridiem}`}</span>
							<br />
							<span style={this.durationCheck(shifts[i].duration)}><i>{durationHours} hrs {durationMinutes} min</i></span>
							<span style={styles.shiftDayText}>{day}</span>
						</div>
					)
				} else {
					if (i === this.props.currentshifts.length - 1) {
						if (shiftMatch === false) {
							return(
								<div style={this.rowHighlight()}>
									<span style={styles.shiftDayText}>{day}</span>
								</div>
							)
						}

					}
				}
			}
		} else {
			return(
				<div style={this.rowHighlight()}>
					<span style={styles.shiftDayText}>{day}</span>
				</div>
			)
		}

	}

	render() {
		return(
			<div>
				{this.display()}
			</div>
		);
	}

}

const styles = {
	shiftBox: {
		width: "225px",
		height: "40px",
		border: "1px solid #666",
		backgroundColor: "#999",
		position: "relative"
	},
	shiftBoxHighlight: {
		width: "225px",
		height: "40px",
		border: "1px solid #666",
		backgroundColor: "#aaa",
		position: "relative"
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
	addShiftButton: {
		backgroundColor: 'Transparent',
		margin: '6px 65px',
		height: '25px',
		width: '91px',
		lineHeight: '10px',
		color: '#666',
		borderRadius: '5px',
		border: '2px dashed #666'
	},
	hasShift: {
		width: "225px",
		height: "40px",
		border: "1px solid #1565C0",
		backgroundColor: "#2B8FFF",
		position: "relative",
		paddingLeft: '3px'
	},
	hasShiftHighlight: {
		width: "225px",
		height: "40px",
		border: "1px solid #1565C0",
		backgroundColor: "#37abff",
		position: "relative",
		paddingLeft: '3px'
	},
	shiftTimes: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: '15px'
	},
	shiftDuration: {
		color: '#fff',
		fontSize: '12px',
		opacity: '0.6',
		position: 'absolute',
		bottom: '0px',
		left: '3px'
	},
	durationError: {
		color: '#900',
		fontSize: '12px',
		position: 'absolute',
		bottom: '0px',
		left: '3px'
	}
}

const mapStateToProps = (state) => {
  let { user, assigned, setcompany, currentemployee, shiftdate, showshift, currentshifts, shiftedit } = state;
  return { user, assigned, setcompany, currentemployee, shiftdate, showshift, currentshifts, shiftedit }
}

export default connect(mapStateToProps)(EmployeeShiftBox);
