import React from 'react';
import { connect } from 'react-redux'

class SideEmployees extends React.Component {
  constructor(props) {
    super(props)

    this.employees = this.employees.bind(this)
  }

  employees() {
		return this.props.setemployee.map( employee => {
			return(<div key={employee.id} style={styles.shiftBox}>{employee.first_name} {employee.last_name}</div>);
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

const styles = {
	shiftBox: {
		width: "225px",
		height: "40px",
		border: "1px solid #666",
		backgroundColor: "#999",
		position: "relative"
	}
}

const mapStateToProps = (state) => {
  let { user, setemployee } = state;
  return { user, setemployee }
}

export default connect(mapStateToProps)(SideEmployees)
