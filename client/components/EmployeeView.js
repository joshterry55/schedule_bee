import React from 'react';
import { connect } from 'react-redux';
import { seteditemployeestate, toggleemployeeedit } from '../actions/editemployee';
import { updateemployees } from '../actions/updateemployeedropdown'
import { currentemployee } from '../actions/setemployee';


class EmployeeView extends React.Component {
  constructor(props) {
    super(props)

    this.toggleEdit = this.toggleEdit.bind(this)
    this.submitEdittedEmployee = this.submitEdittedEmployee.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
  }

  componentDidMount(){
    this.props.dispatch(seteditemployeestate())
    $('select').material_select();
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  display() {
    let employee = this.props.currentemployee
    if(this.props.editemployee) {
      return(
        <div>
          <form className='center' ref='editEmployeeForm' onSubmit={this.submitEdittedEmployee}>
            <label>First Name</label>
            <input ref='employeeFirstName' type='text' defaultValue={employee.first_name} required placeholder="First Name" />
            <label>Last Name</label>
            <input ref='employeeLastName' type='text' defaultValue={employee.last_name} required placeholder="Last Name" />
            <label>Role</label>
            <select ref='employeeRole' defaultValue={employee.role}>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <br />
            <label>Title</label>
            <input ref='employeeTitle' type='text' defaultValue={employee.title} placeholder="Title" />
            <label>Wage</label>
            <input ref='employeeWage' type='text' defaultValue={employee.wage} placeholder="Wage" />
            <label>Phone Number</label>
            <input ref='employeePhone' type='text' defaultValue={employee.phone} placeholder="Phone Number" />
            <input type='submit' className='btn blue darken-3' value='Update'/>
          </form>
        </div>
      )
    } else {
      return(
        <div>
          <p>Name: {employee.first_name} {employee.last_name}</p>
          <p>Role: {employee.role}</p>
          <p>Title: {employee.title}</p>
          <p>Wage: {employee.wage} <small>per hour</small></p>
          <p>Email: {employee.email}</p>
          <p>Phone Number: {employee.phone}</p>
          <p>
          <button className='emp-btn btn blue darken-3' onClick={() => this.toggleEdit()}>Edit</button>
          <button className='emp-btn btn yellow darken-2' onClick={(e) => this.deleteEmployee(e)}>Delete</button>
          </p>
        </div>
      )
    }
  }

  submitEdittedEmployee(e) {
    e.preventDefault()
    let id = this.props.currentemployee.id
    let firstName = this.refs.employeeFirstName.value
    let lastName = this.refs.employeeLastName.value
    let role = this.refs.employeeRole.value
    let title = this.refs.employeeTitle.value
    let phone = this.refs.employeePhone.value
    let wage = (this.refs.employeeWage.value)
    $.ajax({
      type: "PUT",
      url: `/api/users/${id}`,
      dataType: 'JSON',
      data: { user: {
        first_name: firstName,
        last_name: lastName,
        role: role,
        title: title,
        phone: phone,
        wage: wage
      }}
    }).done( employee => {
      let companyID = this.props.setcompany.id
      this.props.dispatch({type: 'CURRENT_EMPLOYEE', employee})
      this.props.dispatch(updateemployees(companyID))
      this.toggleEdit()
    }).fail( data => {
      console.log('failed')
    })
  }

  // company_id: this.props.setcompany.id


  toggleEdit(e) {
    if(e != undefined) {
      e.preventDefault()
    }
    if(this.props.currentemployee.length === 0) {
      alert('Please Select an Employee')
    } else {
      this.props.dispatch(toggleemployeeedit())
    }
  }

  deleteEmployee(e) {
    e.preventDefault()
    if(this.props.currentemployee.length === 0) {
      alert('Please Select an Employee')
    } else {
      let employeeId = this.props.currentemployee.id
      let confirmed = confirm('Are you sure you want to delete?')
      if(confirmed){
        $.ajax({
          url: `/api/users/${employeeId}`,
          type: 'DELETE',
          dataType: 'JSON'
        }).done(employee => {
          let ID = this.props.setcompany.id
          this.props.dispatch(updateemployees(ID))
          this.props.dispatch({type: 'REMOVE_CURRENT_EMPLOYEE'})

        }).fail(data => {

        })
      }
    }
  }

  showEmployees() {

    return this.props.setemployee.map( employee => {
      return(<option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>);
    });
  }

  employeeInfo(e) {
    e.preventDefault()
    let id = this.refs.employee.value
    $.ajax({
      url: `/api/users/${id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( employee => {
      this.props.dispatch(currentemployee(employee));
    }).fail( data => {
      console.log(data);
    });
  }

  render() {
    return(
      <div>
        <form className='center' onSubmit={(e) => this.employeeInfo(e)}>
          <select ref='employee'>
            { this.showEmployees() }
          </select>
          <input className='btn blue darken-3' type='submit' value="View Details" />
        </form>
        <br />
        { this.display() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { currentemployee, editemployee, setcompany, setemployee } = state;
  return { currentemployee, editemployee, setcompany, setemployee }
}

export default connect(mapStateToProps)(EmployeeView)
