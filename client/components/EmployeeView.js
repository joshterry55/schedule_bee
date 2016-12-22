import React from 'react';
import { connect } from 'react-redux'

class EmployeeView extends React.Component {
  constructor(props) {
    super(props)


  }

  display() {
    let employee = this.props.currentemployee
      return(
        <div>
          <p>Name: {employee.first_name} {employee.last_name}</p>
          <p>Role: {employee.role}</p>
          <p>Title: {employee.title}</p>
        </div>
      )
  }

  render() {
    return(
      <div>
        { this.display() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { currentemployee } = state;
  return { currentemployee }
}

export default connect(mapStateToProps)(EmployeeView)
