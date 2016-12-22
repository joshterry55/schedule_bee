import React, { Component, PropTypes } from 'react';
import Schedule from './Schedule';
import SideEmployees from './SideEmployees';
import BottomEmployees from './BottomEmployees';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
				<div className="col s12" style={styles.bottomEmployeesBox}>
					<BottomEmployees />
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
	bottomEmployeesBox: {
		width: '100%',
		backgroundColor: '#999',
		marginTop: '10px',
		height: '150px'
	},
	noPadding: {
		padding: '0px'
	}
}

export default DragDropContext(HTML5Backend)(ScheduleView);