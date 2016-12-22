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
          <select ref='companies'>
            { this.companiesList() }
          </select>
          <input style={styles.button} type='submit' value='Show Employees' />
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

  testChange() {
    console.log("hello")
  }

  render() {
    return(
      <div style={styles.employeeColumn}>
        <div style={styles.companySelectBox}>
          {this.displayCompanies()}
        </div>
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
  companySelectBox: {
    textAlign: 'center',
    height: '89px',
    padding: '0 5px'
  },
	employeeSideBox: {
		width: "100%",
		height: "40px",
    padding: '5px',
		border: "1px solid #666",
		backgroundColor: "#999",
    background: "linear-gradient(#999, #333)",
    fontSize: '15px',
    color: '#fff',
    textShadow: '0 0 10px rgba(0,0,0,0.5)',
    textAlign: 'right',
    lineHeight: '30px',
    overflowX: 'hidden'
	},
  button: {
    height: '21px',
    padding: '0 15px',
    borderRadius: '5px',
    border: '1px solid #666',
    background: "linear-gradient(#bbb, #999)",
    boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
    fontSize: '11px',
    fontWeight: 'bold',
    lineHeight: '20px',
    color: '#333',
    textShadow: '0 1px #ddd',
    position: 'relative',
    top: '-10px'
  }
}

const mapStateToProps = (state) => {
  let { user, assigned, setemployee } = state;
  return { user, assigned, setemployee }
}

export default connect(mapStateToProps)(SideEmployees)
