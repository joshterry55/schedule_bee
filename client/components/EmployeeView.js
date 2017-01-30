import React from 'react';
import { connect } from 'react-redux';
import { seteditemployeestate, toggleemployeeedit } from '../actions/editemployee';
import { updateemployees } from '../actions/updateemployeedropdown'
import { currentemployee } from '../actions/setemployee';
import { setFlash } from '../actions/flash';
import { Dropdown, Button, NavItem } from 'react-materialize';
import { Link } from 'react-router';

class EmployeeView extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loading: false, selected: false }

    this.toggleEdit = this.toggleEdit.bind(this)
    this.submitEdittedEmployee = this.submitEdittedEmployee.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
    this.employeeDropdown = this.employeeDropdown.bind(this)
    this.display = this.display.bind(this)
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
    if(this.state.selected) {
      if(this.state.loading) {
        return(
          <div className="row">
            <div className="col s12 center">
              <div className="preloader-wrapper big active" style={{backgroundColor:'#aaa', borderRadius: '50%', marginTop: '50px', marginBottom: '115px'}}>
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
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
              <p><b>Name:</b> {employee.first_name} {employee.last_name}</p>
              <p><b>Role:</b> {employee.role}</p>
              <p><b>Title:</b> {employee.title ? employee.title : 'none'}</p>
              <p><b>Email:</b> {employee.email}</p>
              <p><b>Phone Number:</b> {employee.phone ? employee.phone : 'none'}</p>
              <p>
                <button style={styles.button} onClick={() => this.toggleEdit()}>Edit</button>
                <button style={styles.deleteButton} onClick={(e) => this.deleteEmployee(e)}>Delete</button>
              </p>
            </div>
          )
        }
      }
    } else {
      return (
        <div className='center'>
          <h4 style={{color: '#ccc'}}>Select an employee.</h4>
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
      let messageSuccess = `${employee.first_name} ${employee.last_name} updated`
      this.props.dispatch(setFlash(messageSuccess, 'success'))
    }).fail( data => {
      console.log('failed')
    })
  }

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
          this.setState({selected: false})
          let ID = this.props.setcompany.id
          this.props.dispatch(updateemployees(ID))
          this.props.dispatch({type: 'REMOVE_CURRENT_EMPLOYEE'})
          let messageSuccess = `${employee.first_name} ${employee.last_name} deleted`
          this.props.dispatch(setFlash(messageSuccess, 'success'))

        }).fail(data => {

        })
      }
    }
  }

  showEmployees() {

    return this.props.setemployee.map( employee => {
      return(<NavItem key={employee.id} value={employee.id} onClick={() => setTimeout(() => this.employeeInfo(employee), 200)}>{employee.first_name} {employee.last_name}</NavItem>);
    });
  }

  employeeInfo(selectedEmployee) {
    this.setState({selected: true, loading: true})
    let id = selectedEmployee.id
    $.ajax({
      url: `/api/users/${id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( employee => {
      this.setState({loading: false})
      this.props.dispatch(currentemployee(employee));
    }).fail( data => {
      console.log(data);
    });
  }

  employeeDropdown() {
    let employeeName
    if (this.props.currentemployee.first_name) {
      employeeName = `${this.props.currentemployee.first_name} ${this.props.currentemployee.last_name}`
    } else {
      employeeName = 'Select Employee'
    }

    if(this.props.setemployee.length) {
      return(
        <div className='col s12 m10 offset-m1 l8 offset-l2'>
          <Dropdown  trigger={<Button style={styles.employeeButton}>{employeeName}</Button>}>
            { this.showEmployees() }
          </Dropdown>
        </div>
      );
    } else {
      return(<h5>No Employees</h5>);
    }
  }

  employeeCheck() {
    if(this.props.setemployee.length) {
      return(
        <div>
          { this.employeeDropdown() }
          <br />
          <br />
          <br />
          { this.display() }
        </div>
      )
    } else {
      return(
        <div className='center'>
          <h5>No employees, <Link to='/employees'>add one</Link>.</h5>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        { this.employeeCheck() }
      </div>
    )
  }
}

// <form className='center' onSubmit={(e) => this.employeeInfo(e)}>
//   <select ref='employee'>
//     { this.showEmployees() }
//   </select>
//   <input style={styles.button} type='submit' value="View Details" />
// </form>



const styles = {
  button: {
    height: '30px',
    padding: '0 10px',
    margin: '6px 5px',
    borderRadius: '5px',
    border: '1px solid #666',
    background: "linear-gradient(#1c86ff, #1257a6)",
    boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
    fontSize: '20px',
    lineHeight: '25px',
    color: '#fff',
    textShadow: '0 0 10px rgba(0,0,0,0.5), 0 1px #8cb7e8'
  },
  deleteButton: {
    height: '30px',
    padding: '0 10px',
    margin: '6px 5px',
    borderRadius: '5px',
    border: '1px solid #666',
    background: "linear-gradient(#900, #c00)",
    boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
    fontSize: '20px',
    lineHeight: '25px',
    color: '#fff',
    textShadow: '0 0 10px rgba(0,0,0,0.5), 0 1px #c77'
  },
  employeeButton: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    lineHeight: '42px',
    width: '100%',
    height: '40px',
    paddingLeft: '5px',
    backgroundColor: '#fff',
    color: '#1665C1',
    borderRadius: '0',
    backgroundImage: 'url("http://res.cloudinary.com/dupyswzaa7/image/upload/v1483816910/dropdown_mgcry5.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
  }
}
// TODO add loading bar
// add react state on whether or not there has been a selection
// if there has, show employee. if not show select employee message
// add a few validations

const mapStateToProps = (state) => {
  let { currentemployee, editemployee, setcompany, setemployee } = state;
  return { currentemployee, editemployee, setcompany, setemployee }
}

export default connect(mapStateToProps)(EmployeeView)
