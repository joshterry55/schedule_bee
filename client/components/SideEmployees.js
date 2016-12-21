import React from 'react';
import { connect } from 'react-redux'

class SideEmployees extends React.Component {
  constructor(props) {
    super(props)

    this.employees = this.employees.bind(this)
  }

  employees() {
		return this.props.setemployee.map( employee => {
			return(<div key={employee.id}>{employee.first_name} {employee.last_name}</div>);
		});
	}

  render() {
    return(
      <div>
        {this.employees()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, setemployee } = state;
  return { user, setemployee }
}

export default connect(mapStateToProps)(SideEmployees)
