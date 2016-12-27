import React from 'react';
import { connect } from 'react-redux'

class ShiftBox extends React.Component {
	constructor(props) {
		super(props)

		this.addShift = this.addShift.bind(this)
	}

	addShift() {
		let date = `${this.props.month}, ${this.props.year}`
		let employeeId = this.props.id
		debugger
		// AJAX call will go here
		// shift will have a start and end date
		// shift will have the employeeId above
		// shift will have date
	}

	display() {
		let day = this.props.day

		return(
			<div style={styles.shiftBox}>
				<button onClick={this.addShift}>+</button>
				<span style={styles.shiftDayText}>{day}</span>
			</div>
		)
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
  let { user, assigned } = state;
  return { user, assigned }
}

export default connect(mapStateToProps)(ShiftBox);
