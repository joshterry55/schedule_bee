import React from 'react';
import AdminNav from './AdminNav';
import { connect } from 'react-redux';
import { currentemployee, setemployee } from '../actions/setemployee';
import EmployeeView from './EmployeeView'
import { seteditcompanystate, toggleedit } from '../actions/editcompany'
// let companyEdit = false

class Company extends React.Component {
  constructor(props){
    super(props)


    this.editCompany = this.editCompany.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.submitEdittedCompany = this.submitEdittedCompany.bind(this)
  }

  componentDidMount() {
    $('select').material_select();

    let companyId = this.props.setcompany.id

    $.ajax({
      url: `/api/companies/${companyId}/users`,
      type: 'GET',
      dataType: 'JSON'
    }).done( companies => {

      this.props.dispatch(setemployee(companies));
      this.props.dispatch(seteditcompanystate())

    }).fail( data => {
      debugger
      console.log(data);
    });
  }

  componentDidUpdate() {
    $('select').material_select();
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

  toggleEdit(e) {
    if(e != undefined) {
      e.preventDefault()
    }
    this.props.dispatch(toggleedit())
  }

  submitEdittedCompany(e) {
    e.preventDefault()
    let id = this.props.setcompany.id
    debugger

    $.ajax({
      type: "PUT",
      url: `/api/companies/${id}`,
      dataType: 'JSON',
      data: { company: { name: this.refs.newCompanyName.value }}
    }).success( company => {
      debugger
      this.props.dispatch({type: 'SET_COMPANY', company})
      this.toggleEdit()
    }).fail( data => {
      console.log('failed')
    })
  }

  editCompany() {
    let company = this.props.setcompany
    if(this.props.editcompany) {
      return(
        <form ref='editCompanyForm' onSubmit={this.submitEdittedCompany}>
          <input ref='newCompanyName' type='text' defaultValue={company.name} required placeholder="Company Name" />
          <input type='submit' className='btn' />
        </form>
      )
    } else {
      return(
        <div className='center'>
          <h2 className='center'>{company.name}</h2>
          <button onClick={() => this.toggleEdit()}>Edit</button>
        </div>
      )
    }
  }

  render() {
    return(
      <div className='row'>
        <AdminNav />
        { this.editCompany() }
        <div className="col s6 offset-s3">
          <br />
          <h4>Employees</h4>
          <form onSubmit={(e) => this.employeeInfo(e)}>
            <select ref='employee'>
              { this.showEmployees() }
            </select>
            <input className='btn blue darken-3' type='submit' />
          </form>
          <EmployeeView />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { setcompany, setemployee, currentemployee, editcompany } = state;
  return { setcompany, setemployee, currentemployee, editcompany }
}

export default connect(mapStateToProps)(Company)
