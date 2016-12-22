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
				<div className="col s12">
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
		height: '150px',
		paddingLeft: '0px'
	},
	noPadding: {
		padding: '0px'
	}
}

export default DragDropContext(HTML5Backend)(ScheduleView);