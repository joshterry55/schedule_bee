import React, { Component, PropTypes } from 'react';
import EmployeeSchedule from './EmployeeSchedule';
import EmployeeSideEmployees from './EmployeeSideEmployees';
import EmployeeContactList from './EmployeeContactList';

class EmployeeScheduleView extends Component {

	render() {
		return(
			<div style={styles.scheduleBox} className="row">
				<div className="col s4 m2" style={styles.sideEmployeesBox}>
					<EmployeeSideEmployees />
				</div>
				<div className="col s8 m10" style={styles.noPadding}>
					<EmployeeSchedule />
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
		zIndex: '-1'
	}
}

export default EmployeeScheduleView;
