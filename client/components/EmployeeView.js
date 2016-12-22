import React from 'react';
import { connect } from 'react-redux'

class EmployeeView extends React.Component {
  render() {
    let employee = this.props.currentemployee
    return(
      <div>
        <p>Name: {employee.first_name} {employee.last_name}</p>
        <p>Role: {employee.role}</p>
        <p>Title: {employee.title}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { currentemployee } = state;
  return { currentemployee }
}

export default connect(mapStateToProps)(EmployeeView)
