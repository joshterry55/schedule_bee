import React from 'react';
import { connect } from 'react-redux'
import { setemployee } from '../actions/setemployee';
import { setcompany } from '../actions/setcompany';
import {browserHistory} from 'react-router';

class EmployeeSideEmployees extends React.Component {
  constructor(props) {
    super(props)

    this.employees = this.employees.bind(this)
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
    let companyId = this.props.user.company_id

    $.ajax({
      url: `/api/companies/${companyId}/users`,
      type: 'GET',
      dataType: 'JSON'
    }).done( companies => {
      this.props.dispatch(setemployee(companies))
    }).fail( data => {
      debugger
      console.log(data);
    });
  }

  componentWillMount() {
    let Id = this.props.user.company_id
    $.ajax({
      url: `/api/companies/${Id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( company => {
      browserHistory.push(`/employeescheduleview/${Id}`);
      this.props.dispatch({type: 'SET_COMPANY', company})

    }).fail( data => {
      debugger
      console.log(data);
    });
  }


  displayCompanies() {
    return(
      <div style={{overflow: 'scroll'}}>
        <span style={styles.company}>{this.props.setcompany.name}</span>
      </div>
    )
  }

  employees() {
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
    height: '83px',
    padding: '0 5px',
    backgroundColor: '#888'
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
  },
  company: {
    textShadow: '0 1px #ddd',
    fontSize: '20px'
  }
}

const mapStateToProps = (state) => {
  let { user, assigned, setemployee, setcompany } = state;
  return { user, assigned, setemployee, setcompany }
}

export default connect(mapStateToProps)(EmployeeSideEmployees)
