import React from 'react';
import AdminNav from './AdminNav';
import { connect } from 'react-redux';
import { currentemployee, setemployee } from '../actions/setemployee';
import EmployeeView from './EmployeeView'

class Company extends React.Component {

  componentDidMount() {
    $('select').material_select();

    let companyId = this.props.setcompany.id

    $.ajax({
      url: `/api/companies/${companyId}/users`,
      type: 'GET',
      dataType: 'JSON'
    }).done( companies => {

      this.props.dispatch(setemployee(companies));

    }).fail( data => {
      debugger
      console.log(data);
    });
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  showEmployees() {
    // let companyId = this.props.setcompany.id
    //
    // $.ajax({
    //   url: `/api/companies/${companyId}/users`,
    //   type: 'GET',
    //   dataType: 'JSON'
    // }).done( companies => {
    //   this.props.dispatch(setemployee(companies));
    //
    // }).fail( data => {
    //   debugger
    //   console.log(data);
    // });
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
    let company = this.props.setcompany
    return(
      <div className='row'>
        <AdminNav />
        <h2 className='center'>{company.name}</h2>
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
  let { setcompany, setemployee, currentemployee } = state;
  return { setcompany, setemployee, currentemployee }
}

export default connect(mapStateToProps)(Company)
