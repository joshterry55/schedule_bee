import React, { Component} from 'react';
import Schedule from './Schedule';
import SideEmployees from './SideEmployees'

class ScheduleView extends Component {
	render() {
		return(
			<div style={styles.scheduleBox} className="row">
				<div className="col s3 m2" style={styles.noPadding}>
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
		height: '500px',
		backgroundColor: '#aaa'
	},
	noPadding: {
		padding: '0px'
	}
}

export default ScheduleView;