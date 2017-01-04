import React from 'react';
import { connect } from 'react-redux'
import { showshift } from '../actions/showshift'
import { currentshifts } from '../actions/currentshifts'

class ShiftBox extends React.Component {
	constructor(props) {
		super(props)

		this.addShift = this.addShift.bind(this)
		this.shiftModal = this.shiftModal.bind(this)
		this.submitShift = this.submitShift.bind(this)
		this.submitEditShift = this.submitEditShift.bind(this)
		this.deleteShift = this.deleteShift.bind(this)
		this.editShift = this.editShift.bind(this)
	}

	componentDidMount() {
		$('.modal').modal();
		let employeeId = this.props.id
		let shiftdate = `${this.props.month}, ${this.props.year}`

		// $.ajax({
		// 	url: `/api/users/${employeeId}/shifts`,
		// 	type: 'GET',
		// 	dataType: 'JSON'
		// }).done( shift => {

		// 	this.props.dispatch(showshift(shift, shiftdate))
		// }).fail( shift => {
		// 	debugger
		// })
	}


	componentWillMount() {
		$('.modal').modal();
	}

	shiftModal() {

		let date = this.props.shiftdate
		let employeeId = this.props.currentemployee
		let company = this.props.setcompany
		let employeeName;
		this.props.setemployee.map( employee => {
			if(employee.id == employeeId) {
				employeeName = `${employee.first_name} ${employee.last_name}`
			}
		})

		return(
			<div>
				<div style={styles.modalHeader}>
					<span>Add Shift</span>
					<span style={styles.modalHeaderInfo}>{date}<br />{employeeName}</span>
				</div>
				<div className="modal-content">
					<form className='row'>
						<div className='col s6 m4 offset-m2'>
							<label>Start Time</label>
							<input type='time' ref='shiftStart' />
						</div>
						<div className='col s6 m4'>
							<label>End Time</label>
							<input type='time' ref='shiftEnd' />
						</div>
					</form>
				</div>
				<div className="modal-footer" style={styles.modalFooter}>
					<a href="#!" onClick={this.submitShift} className=" modal-action modal-close waves-effect waves-green btn-flat">Add</a>
				</div>
			</div>
		)
	}

	editShiftModal() {
		let date = this.props.shiftdate
		let employeeId = this.props.currentemployee
		let shifts = this.props.shiftedit
		let company = this.props.setcompany
		let employeeName;
		this.props.setemployee.map( employee => {
			if(employee.id == employeeId) {
				employeeName = `${employee.first_name} ${employee.last_name}`
			}
		})

		return(
			<div>
				<div style={styles.modalHeader}>
					<span>Edit Shift</span>
					<span style={styles.modalHeaderInfo}>{date}<br />{employeeName}</span>
				</div>
				<div className="modal-content">
					<form className='row'>
						<div className='col s6 m4 offset-m2'>
							<label>Start</label>
							<input type='time' ref='editShiftStart' />
						</div>
						<div className='col s6 m4'>
							<label>End</label>
							<input type='time' ref='editShiftEnd' defaultValue={shifts.end}/>
						</div>
					</form>
				</div>
				<div className="modal-footer" style={styles.modalFooter}>
					<a href="#!" onClick={this.submitEditShift} className=" modal-action modal-close waves-effect waves-green btn-flat">Update</a>
				</div>
			</div>
		)
	}

	calculateDuration(start, end) {
		let startHour = start.substr(0,2)
		let startMinute = start.substr(3,2)
		let endHour = end.substr(0,2)
		let endMinute = end.substr(3,2)
		if (endHour == 0 && endMinute == 0) {
			endHour = 24
		}
		let startTime = (parseInt(startHour * 60) + parseInt(startMinute))
		let endTime = (parseInt(endHour * 60) + parseInt(endMinute))
		let totalTime = (endTime - startTime)
		return(totalTime)
	}

	submitShift(e) {
		e.preventDefault()
		let id = this.props.currentemployee
		let shiftDay = this.props.shiftdate
		let start = this.refs.shiftStart.value
		let end = this.refs.shiftEnd.value
		let companyId = this.props.setcompany.id
		let duration = this.calculateDuration(start, end)

		$.ajax({
			url: '/api/shifts',
			type: 'POST',
			dataType: 'JSON',
			data: { shift: {
        day: shiftDay,
				start: start,
				end: end,
				user_id: id,
				company_id: companyId,
				duration: duration
      }}
		}).done( shift => {
			this.props.dispatch({type: 'ADD_CURRENT_SHIFT', shift})
		}).fail( data => {
			debugger
		})
	}

	submitEditShift(e) {

		e.preventDefault()
		let editId = this.props.shiftedit.id
		let editEmployeeId = this.props.currentemployee
		let editShiftDay = this.props.shiftdate
		let editStart = this.refs.editShiftStart.value
		let editEnd = this.refs.editShiftEnd.value
		let editCompanyId = this.props.setcompany.id
		let editDuration = this.calculateDuration(editStart, editEnd)
		$.ajax({
			url: `/api/shifts/${editId}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { shift: {
				day: editShiftDay,
				start: editStart,
				end: editEnd,
				user_id: editEmployeeId,
				company_id: editCompanyId,
				duration: editDuration
			}}
		}).done( shift => {
			// let companyId = window.location.pathname.substr(10)
			let companyId = shift.company_id
			this.props.dispatch(currentshifts(companyId))
		}).fail( data => {
			debugger
		})
	}

	addShift() {
		let date = `${this.props.month}, ${this.props.year}`
		let employee = this.props.id
		this.props.dispatch({type: 'SHIFT_DATE', date })
		this.props.dispatch({type: 'CURRENT_EMPLOYEE', employee})
	}

	rowHighlight() {
		if(this.props.highlight === 0) {
			return styles.shiftBox
		} else {
			return styles.shiftBoxHighlight
		}
	}

	deleteShift(e, id) {
		e.preventDefault()

		$.ajax({
			url: `/api/shifts/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( shift => {
			this.props.dispatch({type: 'DELETE_CURRENT_SHIFT', shift})
		}).fail( shift => {
			debugger
		})
	}

	editShift(e, shift) {
		e.preventDefault()
		let date = `${this.props.month}, ${this.props.year}`
		let employee = this.props.id
		this.props.dispatch({type: 'SHIFT_DATE', date })
		this.props.dispatch({type: 'CURRENT_EMPLOYEE', employee})
		this.props.dispatch({type: 'EDITTING_SHIFT', shift})
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
		// return this.props.currentshifts.map( shift => {
			// if(shift.day === date) {
			// 	return(
			// 		<div style={this.rowHighlight()}>
			// 			<span style={styles.shiftDayText}>{day}</span>
			// 		</div>
			// 	)
			// } else {
			// 	return(
			// 		<div style={this.rowHighlight()}>
			// 			<button data-target="modal1" onClick={this.addShift} style={styles.addShiftButton}>+ Add Shift</button>
			// 			<span style={styles.shiftDayText}>{day}</span>
			// 		</div>
			// 	)
			// }
		// })
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
						<div style={styles.hasShift}>
							<span style={styles.shiftTimes}>{`${shiftStartHour}:${shiftStartMinute} ${startMeridiem}`} - {`${shiftEndHour}:${shiftEndMinute} ${endMeridiem}`}</span>
							<br />
							<span style={this.durationCheck(shifts[i].duration)}><i>Duration: {durationHours} hrs {durationMinutes} min</i></span>
							<span style={styles.shiftDayText}>{day}</span>
							<button style={styles.shiftDeleteButton} title = 'Delete Shift' onClick={(e) => this.deleteShift(e, shifts[i].id)}> <i className="tiny material-icons">delete</i> </button>
							<button style={styles.shiftEditButton} title='Edit Shift' data-target="modal2" onClick={(e) => this.editShift(e, shifts[i])}> <i className="tiny material-icons">mode_edit</i> </button>
						</div>
					)
				} else {
					if (i === this.props.currentshifts.length - 1) {
						if (shiftMatch === false) {
							return(
								<div style={this.rowHighlight()}>
									<button data-target="modal1" onClick={this.addShift} style={styles.addShiftButton}>+ Add Shift</button>
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
					<button data-target="modal1" onClick={this.addShift} style={styles.addShiftButton}>+ Add Shift</button>
					<span style={styles.shiftDayText}>{day}</span>
				</div>
			)
		}

	}

	render() {
		return(
			<div>
				{this.display()}
				<div id="modal1" className="modal" style={styles.modalStyling}>
					{this.shiftModal()}
				</div>
				<div id="modal2" className="modal" style={styles.modalStyling}>
					{this.editShiftModal()}
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
		color: '#777',
		borderRadius: '5px',
		border: '2px dashed #777'
	},
	hasShift: {
		width: "225px",
		height: "40px",
		border: "1px solid #1565C0",
		backgroundColor: "#2B8FFF",
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
	shiftEditButton: {
		background: 'Transparent',
		color: '#000',
		opacity: "0.35",
		border: 'none',
		position: "absolute",
		top: "-2px",
		right: "15px",
	},
	shiftDeleteButton: {
		background: 'Transparent',
		color: '#000',
		opacity: "0.35",
		border: 'none',
		position: "absolute",
		top: "-2px",
		right: "-5px",
	},
	modalStyling: {
		height: '220px',
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
	}
}

const mapStateToProps = (state) => {
  let { user, assigned, setcompany, currentemployee, shiftdate, showshift, currentshifts, shiftedit, setemployee } = state;
  return { user, assigned, setcompany, currentemployee, shiftdate, showshift, currentshifts, shiftedit, setemployee }
}

export default connect(mapStateToProps)(ShiftBox);
