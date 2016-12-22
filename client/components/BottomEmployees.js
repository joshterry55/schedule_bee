import React from 'react';
import { connect } from 'react-redux';
import EmployeeDragBox from './EmployeeDragBox';
import { setemployee } from '../actions/setemployee';
import { setcompany } from '../actions/setcompany';

class BottomEmployees extends React.Component {
	 constructor(props) {
    super(props)

    this.companiesList = this.companiesList.bind(this);
    this.displayEmployees = this.displayEmployees.bind(this)
  }

	componentDidUpdate() {
    $('select').material_select();
  }

	showEmployees() {
		if(this.props.setemployee.length) {
			return (
				this.props.setemployee.map( employee => {
					return(
						<EmployeeDragBox key={employee.id} employee={employee} />
					)
				})
			)
		}	else {
			return(
					<div>
						<br />
						<h5 className="center">No Company Selected</h5>
						<h6 className="center">Choose a company to the left and click 'Show Employees'</h6>
					</div>
			)
		}
	}

	displayCompanies() {
    if(this.props.assigned.length) {
      return(
        <form onSubmit={this.displayEmployees}>
          <select ref='companies' defaultValue={this.props.setcompany.id}>
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

  displayEmployees(e) {
    e.preventDefault()
    let companyId = this.refs.companies.value

    $.ajax({
      url: `/api/companies/${companyId}/users`,
      type: 'GET',
      dataType: 'JSON'
    }).done( companies => {
      this.props.dispatch(setemployee(companies))
      this.props.dispatch(setcompany(companyId))

    }).fail( data => {
      debugger
      console.log(data);
    });
  }

	render() {
		return(
			<div className="row">
				<div className="col s5 m3" style={styles.companySelectSection}>
					<div style={styles.companySelectBox}>
          	{this.displayCompanies()}
        	</div>
				</div>
				<div className="col s7 m9">
					{this.props.setemployee.length ? <h6 className="white-text">Employees:</h6> : null }
					{this.showEmployees()}
				</div>
			</div>
		);
	}
}

const styles = {
	companySelectSection: {
		paddingTop: '25px',
		backgroundColor: '#888',
		height: '150px',
	},
	companySelectBox: {
    textAlign: 'center',
    height: '89px',
    padding: '0 5px'
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
	let { user, assigned, setemployee, setcompany } = state;
  return { user, assigned, setemployee, setcompany }
}

export default connect(mapStateToProps)(BottomEmployees);