import React from 'react';
import { connect } from 'react-redux'
import { setemployee } from '../actions/setemployee';
import { setcompany } from '../actions/setcompany';
import {browserHistory} from 'react-router';


class SideEmployees extends React.Component {
  constructor(props) {
    super(props)

    this.employees = this.employees.bind(this)
    this.companiesList = this.companiesList.bind(this);
    this.displayEmployees = this.displayEmployees.bind(this)
  }

  componentDidMount() {
    $(function(){
      $('.scrollLinkedY').scroll(function(){
        $('.scrollLinkedY').scrollTop($(this).scrollTop());
      })

      $('.scrollLinkedX').scroll(function(){
        $('.scrollLinkedX').scrollLeft($(this).scrollLeft());
      })
    })
  }

  componentDidUpdate() {
    $('select').material_select();
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

  employees() {
    debugger
		return this.props.setemployee.map( employee => {
			return(<div key={employee.id} style={styles.employeeSideBox}>
              <div style={{
                height: '36px',
                width: '36px',
                borderRadius: '50%',
                position: 'absolute',
                left: '6px',
                top: '2px',
                boxShadow: '0 0 2px rgba(0,0,0,0.35)',
                border: '1px solid #000',
                backgroundImage: `url(${employee.avatar})`,
                backgroundSize: 'cover'
               }}></div>
              {employee.first_name} {employee.last_name}
            </div>);
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
      browserHistory.push(`/schedule/${companyId}`);
      let that = window.location.pathname.substr(10)
      this.props.dispatch(setemployee(companies))
      this.props.dispatch(setcompany(companyId))
    }).fail( data => {
      debugger
      console.log(data);
    });
  }

  render() {
    return(
      <div style={styles.employeeColumn}>
        <div style={styles.companySelectBox}>
          {this.displayCompanies()}
        </div>
        <div style={styles.employeeSideWindow} className="scrollLinkedY">
          <div style={styles.employeeSideContainer}>
            {this.employees()}
          </div>
        </div>
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
    height: '86px',
    padding: '0 5px',
    backgroundColor: '#888',
    overflowY: 'hidden'
  },
  employeeSideWindow: {
    width: '100%',
    height: '451px',
    overflowY: 'scroll'
  },
  employeeSideContainer: {
    paddingBottom: '7px'
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
    textAlign: 'left',
    lineHeight: '30px',
    overflow: 'hidden',
    position: 'relative',
    paddingLeft: '52px'
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
  },
  avatar: {
    height: '36px',
    width: 'auto',
    borderRadius: '50%',
    position: 'absolute',
    left: '6px',
    top: '2px',
    boxShadow: '0 0 2px rgba(0,0,0,0.35)',
    border: '1px solid #000'
  }
}

const mapStateToProps = (state) => {
  let { user, assigned, setemployee, setcompany } = state;
  return { user, assigned, setemployee, setcompany }
}

export default connect(mapStateToProps)(SideEmployees)
