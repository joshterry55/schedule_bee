import React, { PropTypes } from 'react';
import { ItemTypes } from './Constants.js';
import { DragSource } from 'react-dnd';

const shiftSource = {
  beginDrag(props) {
    return {employeeId: props.employee.id};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class EmployeeDragBox extends React.Component {

	render() {
		const { connectDragSource, isDragging } = this.props;
		let employee = this.props.employee
		return connectDragSource(
			<div style={{...styles.dragBox, ...{opacity: isDragging ? 0.5 : 1} }}>
				{employee.first_name} {employee.last_name}
			</div>
		);
	}
}

EmployeeDragBox.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

const styles ={
	dragBox: {
		margin: '5px',
		padding: '5px',
		backgroundColor: '#1565c0',
		color: '#fff',
		borderRadius: '5px',
		float: 'left',
		cursor: 'move'
	}
}

export default DragSource(ItemTypes.SHIFT, shiftSource, collect)(EmployeeDragBox);