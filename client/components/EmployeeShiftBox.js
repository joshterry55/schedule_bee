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

	display() {
		let day = this.props.day
		let date = `${this.props.month}, ${this.props.year}`
		let shifts = this.props.currentshifts
		let shiftMatch = false
		if(this.props.currentshifts.length != 0) {
			for (var i = 0; i < this.props.currentshifts.length; i++) {
				if (shifts[i].day === date && shifts[i].user_id === this.props.id) {
					shiftMatch = true;
					return (
						<div style={styles.hasShift}>
							<span>{shifts[i].start} - {shifts[i].end}</span>
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
		border: "1px solid #666",
		backgroundColor: "#FFF",
		position: "relative"
	},
}

const mapStateToProps = (state) => {
  let { user, assigned, setcompany, currentemployee, shiftdate, showshift, currentshifts, shiftedit } = state;
  return { user, assigned, setcompany, currentemployee, shiftdate, showshift, currentshifts, shiftedit }
}

export default connect(mapStateToProps)(EmployeeShiftBox);
