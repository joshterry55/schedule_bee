import React from 'react';
import { connect } from 'react-redux';

class EmployeeInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = { edit: false }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.employeeUpdate = this.employeeUpdate.bind(this)
  }

  componentDidMount() {
    let employee = this.props.user
    this.props.dispatch({type: 'CURRENT_EMPLOYEE', employee})
  }

  employeeUpdate(e) {
    e.preventDefault()
    let phone = this.refs.phoneNumber.value
    let id = this.props.user.id
    $.ajax({
      type: "PUT",
      url: `/api/users/${id}`,
      dataType: 'JSON',
      data: { user: {
        phone: phone
      }}
    }).done( employee => {

      this.toggleEdit()
      this.props.dispatch({type: "CURRENT_EMPLOYEE", employee})
    }).fail( data => {
      console.log('failed')
    })
  }

  display() {
    let employee = this.props.currentemployee
    if(this.state.edit) {
      return(
        <div>
          <form onSubmit={this.employeeUpdate}>
            <input type='text' ref='phoneNumber' placeholder='Phone Number' defaultValue={employee.phone}/>
            <input type='submit' />
          </form>
        </div>
      )
    } else {
      return(
        <div>
          <h2>{employee.first_name} {employee.last_name}</h2>
          <img style={styles.avatar}src={employee.avatar} />
          <h4>Phone Number</h4>
          <p>{employee.phone}</p>
          <h4>Email</h4>
          <p>{employee.email}</p>
          <h4>Title</h4>
          <p>{employee.title}</p>
        </div>
      )
    }
  }

  toggleEdit() {

    this.setState({ edit: !this.state.edit })
  }

  render() {
    let employee = this.props.currentemployee
    return(
      <div className="container">
        <div>
          Welcome {employee.first_name}
        </div>
        {this.display()}
        <button onClick={this.toggleEdit}>Edit</button>
      </div>
    )
  }

}

const styles = {
	avatar: {
	},
}

const mapStateToProps = (state) => {
  let { user, currentemployee } = state;
  return { user, currentemployee }
}

export default connect(mapStateToProps)(EmployeeInfo)
