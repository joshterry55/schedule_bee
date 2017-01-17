import React from 'react';
import { connect } from 'react-redux'
import { showshift } from '../actions/showshift'
import { currentshifts } from '../actions/currentshifts'
import { currentemployee } from '../actions/currentemployee'

class EmployeeShiftBox extends React.Component {
	constructor(props) {
		super(props)

		this.shiftDetails = this.shiftDetails.bind(this)
		this.employeeShiftModal = this.employeeShiftModal.bind(this)
	}

	componentDidMount() {
		$('.modal').modal();
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

	shiftDetails(e, shift) {
		e.preventDefault()
		let id = this.props.id
		this.props.dispatch(currentemployee(id))
		this.props.dispatch({type: 'SHIFT_DETAILS', shift})
	}

	employeeShiftModal() {
		let shift = this.props.shiftdetails
		let employee = `${this.props.currentemployee.first_name} ${this.props.currentemployee.last_name}`
		return(
			<div className='row'>
				<div style={styles.modalHeader}>
					<span>Shift Details</span>
					<span style={styles.modalHeaderInfo}>{shift.day}<br />{employee}</span>
				</div>
				<div className='col s12 m10 offset-m1'>
					<p>{shift.details ? shift.details : 'None'}</p>
				</div>
				<div className="modal-footer" style={styles.modalFooter}>
					<button className=" modal-action modal-close waves-effect waves-green btn-flat">Done</button>
				</div>
			</div>
		)
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
					let regexCheck = new RegExp('^\\d{2}:\\d{2}$')
					let startCheck = regexCheck.test(shifts[i].start)
					let endCheck = regexCheck.test(shifts[i].end)
					if (startCheck && endCheck) {
						let shiftStartHour = shifts[i].start.substr(0,2)
						let shiftStartMinute = shifts[i].start.substr(3,2)
						let startMeridiem = 'AM'
						if (shiftStartHour >= 12) {
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
						if (shiftEndHour >= 12) {
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
								<button className="details-icon" style={styles.shiftDetailsButton} title='Shift Details' data-target="employeeModal" onClick={(e) => this.shiftDetails(e, shifts[i])}> <i className="tiny material-icons">view_list</i> </button>
							</div>
						)
					} else {
						return (
							<div style={this.shiftHighlight()}>
								<span style={styles.shiftTimes}>{shifts[i].start} - {shifts[i].end}</span>
								<br />
								<span style={styles.shiftDayText}>{day}</span>
							</div>
						)
					}
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
				<div id="employeeModal" className="modal" style={styles.modalStyling}>
					{this.employeeShiftModal()}
				</div>
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
	},
	modalStyling: {
		height: '250px',
		width: '80%',
		maxWidth: '500px',
		border: '1px solid #333',
		borderRadius: '10px'
	},
	modalFooter: {
		position: 'absolute',
		bottom: '0px',
	},
	modalHeader: {
		width: '100%',
		height: '60px',
		lineHeight: '61px',
		color: '#fff',
		fontSize: '35px',
		textShadow: '0 0 5px rgba(0,0,0,0.50)',
		backgroundColor: "#66f",
		background: "linear-gradient(#1b7ff2, #1257a6)",
		borderBottom: '1px solid #333',
		boxShadow: '0 0 6px #000',
		position: 'relative',
		paddingLeft: '10px'
	},
	modalHeaderInfo: {
		color: '#fff',
		fontSize: '20px',
		lineHeight: '30px',
		position: 'absolute',
		right: '10px',
		textAlign: 'right',
		textShadow: '0 0 5px rgba(0,0,0,0.50)'
	},
	shiftDetailsButton: {
		background: 'Transparent',
		color: '#000',
		opacity: "0.35",
		border: 'none',
		position: "absolute",
		top: "-2px",
		right: "2px",
	}
}

const mapStateToProps = (state) => {
  let { user, assigned, setcompany, currentemployee, shiftdate, showshift, currentshifts, shiftedit, shiftdetails } = state;
  return { user, assigned, setcompany, currentemployee, shiftdate, showshift, currentshifts, shiftedit, shiftdetails }
}

export default connect(mapStateToProps)(EmployeeShiftBox);
