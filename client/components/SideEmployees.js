import React from 'react';
import { connect } from 'react-redux'
import { setemployee } from '../actions/setemployee';
import { setcompany } from '../actions/setcompany';
import {browserHistory} from 'react-router';
import { Dropdown, Button, NavItem } from 'react-materialize';


class SideEmployees extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loading: false }

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
    let companyName
    if (this.props.setcompany.name) {
      companyName = this.props.setcompany.name
    } else {
      companyName = 'Select Company'
    }
    if(this.props.assigned.length) {
      return(
          <Dropdown  trigger={<Button style={styles.companyButton}>{companyName}</Button>}>
            { this.companiesList() }
          </Dropdown>
      );
    } else {
      return(<h5>No Companies</h5>);
    }
  }

  companiesList() {
    return this.props.assigned.map( company => {
      return(<NavItem key={company.id} onClick={() => setTimeout(() => this.displayEmployees(company), 200)}>{company.name}</NavItem>);
    });
  }

  employees() {
		return this.props.setemployee.map( employee => {
      let myTime = 0 
      if(this.props.totalhours[employee.id]) {
        myTime = this.props.totalhours[employee.id]
      }
        let myHours = Math.floor(myTime / 60);
        let myMinutes = myTime % 60;
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
              <div style={this.overtimeCheck(myTime)}>
                {myHours}hrs {myMinutes}min
              </div>
            </div>);
		});
	}

  overtimeCheck(time) {
    if (time > 2400) {
      return (styles.weeklyTotalOT)
    } else {
      return (styles.weeklyTotal)
    }
  }

  displayEmployees(companyDetails) {
    this.setState({ loading: true })
    this.props.dispatch({type: 'RESET_EMPLOYEE'})
    let companyId = companyDetails.id
    let company = companyDetails
    $.ajax({
      url: `/api/companies/${companyId}/users`,
      type: 'GET',
      dataType: 'JSON'
    }).done( companies => {
      this.setState({ loading: false })
      browserHistory.push(`/schedule/${companyId}`);
      let that = window.location.pathname.substr(10)
      this.props.dispatch(setemployee(companies))
      this.props.dispatch({type: 'SET_COMPANY', company})
    }).fail( data => {
      console.log(data);
    });
  }

  loadingState() {
    if (this.state.loading) {
      return(
        <div className="row">
          <div className="col s12 center">
            <div className="preloader-wrapper big active" style={{backgroundColor:'#aaa', borderRadius: '50%', marginTop: '25px'}}>
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
    }
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
            {this.loadingState()}
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
    overflow: 'hidden',
    paddingTop: '46px',
    backgroundColor: '#888',
    backgroundImage: 'url("http://res.cloudinary.com/dupyswzaa7/image/upload/v1483816182/tinyBeeAccent_ohalki.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center'
  },
  companyButton: {
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
    backgroundPosition: 'right center'
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
  weeklyTotal: {
    position: 'absolute',
    top: '-9px',
    right: '0',
    fontSize: '10px',
    height: '22px',
    paddingLeft: '2px',
    backgroundColor: '#999',
    border: '1px solid #888',
    color: '#fff',
    textAlign: 'right',
  },
  weeklyTotalOT: {
    position: 'absolute',
    top: '-9px',
    right: '0',
    fontSize: '10px',
    height: '22px',
    paddingLeft: '2px',
    backgroundColor: '#900',
    border: '1px solid #888',
    color: '#fff',
    textAlign: 'right',
  }
}

const mapStateToProps = (state) => {
  let { user, assigned, setemployee, setcompany, totalhours } = state;
  return { user, assigned, setemployee, setcompany, totalhours }
}

export default connect(mapStateToProps)(SideEmployees)
