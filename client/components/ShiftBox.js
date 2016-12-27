import React from 'react';
import { connect } from 'react-redux'

class ShiftBox extends React.Component {
	constructor(props) {
		super(props)

		this.addShift = this.addShift.bind(this)
		this.shiftModal = this.shiftModal.bind(this)
		this.submitShift = this.submitShift.bind(this)
	}

	componentDidMount() {
		// let compId = this.props.setcompany
		debugger
		// $.ajax({
		// 	url: `/api/companies//shifts`
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

	submitShift(e) {
		e.preventDefault()
		let id = this.props.currentemployee
		let shiftDay = this.props.shiftdate
		let start = this.refs.shiftStart.value
		let end = this.refs.shiftEnd.value
		let companyId = this.props.setcompany.id

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
			debugger
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

	display() {
		let day = this.props.day

		return(
			<div style={styles.shiftBox}>
				<button data-target="modal1" onClick={this.addShift}>+</button>
				<span style={styles.shiftDayText}>{day}</span>
			</div>
		)
	}

	render() {
		return(
			<div>
				{this.display()}
				<div id="modal1" className="modal">
					{this.shiftModal()}
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
	shiftDayText: {
		fontWeight: "bold",
		fontSize: "18px",
		color: "#000",
		opacity: "0.10",
		position: "absolute",
		bottom: "0px",
		right: "2px",
		transform: "rotate(-35deg)"
	}
}

const mapStateToProps = (state) => {
  let { user, assigned, setcompany, currentemployee, shiftdate } = state;
  return { user, assigned, setcompany, currentemployee, shiftdate }
}

export default connect(mapStateToProps)(ShiftBox);
