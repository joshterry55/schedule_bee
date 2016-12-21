import React from 'react';
import { connect } from 'react-redux'
import { setemployee } from '../actions/setemployee';

class SideEmployees extends React.Component {
  constructor(props) {
    super(props)

    this.employees = this.employees.bind(this)
    this.companiesList = this.companiesList.bind(this);
    this.displayEmployees = this.displayEmployees.bind(this)
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  displayCompanies() {
    if(this.props.assigned.length) {
      return(
        <form onSubmit={this.displayEmployees}>
          <select ref='companies' onChange={this.displayEmployees}>
            { this.companiesList() }
          </select>
          <input className='btn' type='submit' />
        </form>
      );
    } else {
      return(<h5>No Companies</h5>);
    }
  }

  companiesList() {
    return this.props.assigned.map( company => {
      return(<option key={company.id} value={company.id}>{company.name}</option>);
    });
  }

  employees() {
		return this.props.setemployee.map( employee => {
			return(<div key={employee.id} style={styles.employeeSideBox}>{employee.first_name} {employee.last_name}</div>);
		});
	}

  displayEmployees(e) {
    e.preventDefault()
    let companyId = this.refs.companies.value

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

  render() {
    return(
      <div style={styles.employeeColumn}>
        {this.displayCompanies()}
        {this.employees()}
      </div>
    )
  }
}

const styles = {
  employeeColumn: {
    height: '100%',
    width: '100%'
  },
	employeeSideBox: {
		width: "225px",
		height: "40px",
		border: "1px solid #666",
		backgroundColor: "#999",
		position: "relative"
	}
}

const mapStateToProps = (state) => {
  let { user, assigned, setemployee } = state;
  return { user, assigned, setemployee }
}

export default connect(mapStateToProps)(SideEmployees)
