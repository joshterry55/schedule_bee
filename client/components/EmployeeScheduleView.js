import React, { Component, PropTypes } from 'react';
import EmployeeSchedule from './EmployeeSchedule';
import EmployeeSideEmployees from './EmployeeSideEmployees';
import EmployeeContactList from './EmployeeContactList';

class EmployeeScheduleView extends Component {
	render() {
		return(
			<div style={styles.scheduleBox} className="row">
				<div className="col s3 m2" style={styles.sideEmployeesBox}>
					<EmployeeSideEmployees />
				</div>
				<div className="col s9 m10" style={styles.noPadding}>
					<EmployeeSchedule />
				</div>
				<div className="col s8 offset-s2">
					<EmployeeContactList />
				</div>
			</div>
		);
	}
}

const styles = {
	scheduleBox: {
		width: '100%',
		height: '450px',
		backgroundColor: '#aaa'
	},
	sideEmployeesBox: {
		backgroundColor: '#888',
		padding: '0px',
		height: '100%'
	},
	noPadding: {
		padding: '0px'
	}
}

export default EmployeeScheduleView;
