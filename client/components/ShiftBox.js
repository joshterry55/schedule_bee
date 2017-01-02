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
		let employeeId = this.props.id

		let company = this.props.setcompany
		return(
			<div>
				<div className="modal-content">
					<h4>{date}</h4>
					<form className='row'>
						<div className='col s3'>
							<label>Start</label>
							<input type='text' ref='shiftStart' />
						</div>
						<div className='col s3'>
							<label>End</label>
							<input type='text' ref='shiftEnd' />
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<a href="#!" onClick={this.submitShift} className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
				</div>
			</div>
		)
	}

	editShiftModal() {
		let date = this.props.shiftdate
		let employeeId = this.props.id

		let company = this.props.setcompany
		return(
			<div>
				<div className="modal-content">
					<h4>{date}</h4>
					<form className='row'>
						<div className='col s3'>
							<label>Start</label>
							<input type='text' ref='editShiftStart' />
						</div>
						<div className='col s3'>
							<label>End</label>
							<input type='text' ref='editShiftEnd' />
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<a href="#!" onClick={this.submitEditShift} className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
				</div>
			</div>
		)
	}

	submitShift(e) {
		e.preventDefault()
		let id = this.props.currentemployee
		let shiftDay = this.props.shiftdate
		let start = this.refs.shiftStart.value
		let end = this.refs.shiftEnd.value
		let companyId = this.props.setcompany.id
		debugger
		$.ajax({
			url: '/api/shifts',
			type: 'POST',
			dataType: 'JSON',
			data: { shift: {
        day: shiftDay,
				start: start,
				end: end,
				user_id: id,
				company_id: companyId
      }}
		}).done( shift => {
			this.props.dispatch({type: 'ADD_CURRENT_SHIFT', shift})
		}).fail( data => {
			debugger
		})
	}

	submitEditShift(e) {

		e.preventDefault()
		let editId = this.props.shiftedit
		let editEmployeeId = this.props.currentemployee
		let editShiftDay = this.props.shiftdate
		let editStart = this.refs.editShiftStart.value
		let editEnd = this.refs.editShiftEnd.value
		let editCompanyId = this.props.setcompany.id
		$.ajax({
			url: `/api/shifts/${editId}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { shift: {
				day: editShiftDay,
				start: editStart,
				end: editEnd,
				user_id: editEmployeeId,
				company_id: editCompanyId
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

	editShift(e, id) {
		e.preventDefault()
		let date = `${this.props.month}, ${this.props.year}`
		let employee = this.props.id
		this.props.dispatch({type: 'SHIFT_DATE', date })
		this.props.dispatch({type: 'CURRENT_EMPLOYEE', employee})
		this.props.dispatch({type: 'EDITTING_SHIFT', id})
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
					return (
						<div style={styles.hasShift}>
							<span style={styles.shiftTimes}>{shifts[i].start} - {shifts[i].end}</span>
							<span style={styles.shiftDayText}>{day}</span>
							<button style={styles.shiftDeleteButton} title = 'Delete Shift' onClick={(e) => this.deleteShift(e, shifts[i].id)}> <i className="tiny material-icons">delete</i> </button>
							<button style={styles.shiftEditButton} title='Edit Shift' data-target="modal2" onClick={(e) => this.editShift(e, shifts[i].id)}> <i className="tiny material-icons">mode_edit</i> </button>
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
				<div id="modal1" className="modal">
					{this.shiftModal()}
				</div>
				<div id="modal2" className="modal">
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
	}
}

const mapStateToProps = (state) => {
  let { user, assigned, setcompany, currentemployee, shiftdate, showshift, currentshifts, shiftedit } = state;
  return { user, assigned, setcompany, currentemployee, shiftdate, showshift, currentshifts, shiftedit }
}

export default connect(mapStateToProps)(ShiftBox);
