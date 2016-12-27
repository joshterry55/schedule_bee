import React from 'react';

class EmployeeShiftBox extends React.Component {

	render() {
		let day = this.props.day
		return(
			<div style={styles.shiftBox}>
      	<span style={styles.shiftDayText}>{day}</span>
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

export default EmployeeShiftBox;
