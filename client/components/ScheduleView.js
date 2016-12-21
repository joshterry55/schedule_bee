import React, { Component} from 'react';
import Schedule from './Schedule';
import SideEmployees from './SideEmployees'

class ScheduleView extends Component {
	render() {
		return(
			<div style={styles.scheduleBox} className="row">
				<div className="col s3 m2">
					<SideEmployees />
				</div>
				<div className="col s9 m10">
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
	}
}

export default ScheduleView;