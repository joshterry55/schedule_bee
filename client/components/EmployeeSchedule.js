import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import setdate from '../actions/setdate';
import setweek from '../actions/setweek';
import { getcompanies } from '../actions/companies';
import DayColumn from './DayColumn';
let weekOffset = 0

class EmployeeSchedule extends Component {
	constructor(props) {
		super(props);

		this.setWeekBack = this.setWeekBack.bind(this)
		this.setCurrent = this.setCurrent.bind(this)
		this.setWeekForward = this.setWeekForward.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(setdate());
		this.props.dispatch(getcompanies());
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
			<div>
				<div className="col s6 offset-s3 center">
					<button type='button' style={styles.button} onClick={this.setWeekBack}>&lt;&lt;</button>&nbsp;
					<button type='button' style={{...styles.button, ...styles.buttonCurrent}} onClick={this.setCurrent}>Current</button>&nbsp;
					<button type='button' style={styles.button} onClick={this.setWeekForward}>&gt;&gt;</button>
				</div>
				<div className="col s12" style={styles.noPadding}>
					<div style={styles.calendarWindow}>
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
			</div>
		);
	}
}

const styles = {
	calendarWindow: {
		height: '394px',
		width: '100%',
		padding: "3px",
		backgroundColor: "#ccc",
		border: "1px solid black",
		overflow: 'scroll'
	},
	calendar: {
		width: '1579px',
		height: '100%'
	},
	button: {
		height: '35px',
		padding: '0 15px',
		margin: '5px',
		borderRadius: '5px',
		border: '1px solid #666',
		background: "linear-gradient(#bbb, #999)",
		boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
		fontSize: '20px',
		fontWeight: 'bold',
		lineHeight: '25px',
		color: '#333',
		textShadow: '0 1px #ddd'
	},
	buttonCurrent: {
		background: "linear-gradient(#1c86ff, #1257a6)",
		color: '#0d3c73',
		textShadow: '0 0 10px rgba(255,255,255,0.5), 0 1px #8cb7e8'
	},
	viewButton: {
    height: '21px',
    padding: '0 15px',
    borderRadius: '5px',
    border: '1px solid #666',
    background: "linear-gradient(#bbb, #999)",
    boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
    fontSize: '11px',
    fontWeight: 'bold',
    lineHeight: '20px',
    color: '#333',
    textShadow: '0 1px #ddd',
    position: 'relative',
    top: '-1px'
  },
	noPadding: {
		paddingLeft: '0px'
	}
}

const mapStateToProps = (state) => {
  let { user, assigned } = state;
  return { user, assigned }
}

export default connect(mapStateToProps)(EmployeeSchedule);
