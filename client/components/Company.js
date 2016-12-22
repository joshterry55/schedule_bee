import React from 'react';
import AdminNav from './AdminNav';
import { connect } from 'react-redux';
import { setemployee } from '../actions/setemployee';


class Company extends React.Component {

  componentDidMount() {
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

  showEmployees() {
    return this.props.setemployee.map( employee => {
      return(<div key={employee.id}>{employee.first_name} {employee.last_name}</div>);
    });
  }

  render() {
    let employee = this.props.setemployee
    let company = this.props.setcompany
    return(
      <div>
        <AdminNav />
        <h2 className='center'>{company.name}</h2>
        {this.showEmployees()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { setcompany, setemployee } = state;
  return { setcompany, setemployee }
}

export default connect(mapStateToProps)(Company)
