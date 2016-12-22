import React, { Component, PropTypes } from 'react';
import Schedule from './Schedule';
import SideEmployees from './SideEmployees';

class ScheduleView extends Component {
	render() {
		return(
			<div style={styles.scheduleBox} className="row">
				<div className="col s3 m2" style={styles.sideEmployeesBox}>
					<SideEmployees />
				</div>
				<div className="col s9 m10" style={styles.noPadding}>
					<Schedule />
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

export default ScheduleView;