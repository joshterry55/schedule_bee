import React from 'react';
import { connect } from 'react-redux';
import EmployeeDragBox from './EmployeeDragBox';

class BottomEmployees extends React.Component {
	

	showEmployees() {
		if(this.props.setemployee.length) {
			return (
				this.props.setemployee.map( employee => {
					return(
						<EmployeeDragBox key={employee.id} employee={employee} />
					)
				})
			)
		}	else {
			return(
				<div>
					<h5 className="center">No Company Selected</h5>
					<h6 className="center">Choose a company above and click 'Show Employees'</h6>
				</div>
			)
		}
	}

	render() {
		return(
			<div>
				{this.props.setemployee.length ? <h6 className="white-text">Employees:</h6> : null }
				{this.showEmployees()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	let { setemployee } = state;
  return { setemployee }
}

export default connect(mapStateToProps)(BottomEmployees);