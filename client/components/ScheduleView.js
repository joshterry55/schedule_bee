import React, { Component, PropTypes } from 'react';
import Schedule from './Schedule';
import SideEmployees from './SideEmployees';
import { connect } from 'react-redux';
import EmployeeContactList from './EmployeeContactList';

class ScheduleView extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount(){

		if(this.props.user.role === "employee") {

			this.props.history.push('/employeescheduleview')
		}
	}

	render() {
		return(
			<div style={styles.scheduleBox} className="row">
				<div className="col s4 m2" style={styles.sideEmployeesBox}>
					<SideEmployees />
				</div>
				<div className="col s8 m10" style={styles.noPadding}>
					<Schedule />
				</div>
				<div className="col s10 offset-s1" style={styles.noPadding}>
					<EmployeeContactList />
				</div>
				<div className="col s10 offset-s1" style={styles.whiteBottom}>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  let { user } = state;
  return { user }
}

const styles = {
	scheduleBox: {
		width: '100%',
		height: '550px',
		backgroundColor: '#aaa',
		borderBottom: '1px solid black',
		boxShadow: '0 5px 25px rgba(0,0,0,0.50)',
	},
	sideEmployeesBox: {
		backgroundColor: '#888',
		padding: '0px',
		height: '100%'
	},
	noPadding: {
		padding: '0px'
	},
	whiteBottom: {
		position: 'fixed',
		bottom: '0px',
		height: '3000px',
		backgroundColor: '#fff',
		// borderRight: 'inset 12px rgba(0,0,0,0.33)',
		// borderLeft: 'inset 12px rgba(0,0,0,0.33)',
		zIndex: '-1'
	}
}

export default connect(mapStateToProps)(ScheduleView);
