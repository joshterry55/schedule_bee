import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { removecurrentemployee } from '../actions/setemployee'


class AdminNav extends React.Component {


  onPage(tab) {
    switch(tab) {
      case "companies":
        if(document.location.pathname === "/companies") {
          return styles.onTab
        } else {
          return styles.adminTab
        }
        break;
      case "employees":
        if(document.location.pathname === "/employees") {
          return styles.onTab
        } else {
          return styles.adminTab
        }
    }
  }

  render() {
    return(
      <div className="row">
        <div className="col s12">
          <ul className="tabs tabs-fixed-width" style={styles.topMargin}>
            <li onClick={() => this.props.dispatch(removecurrentemployee())}style={this.onPage("companies")} className="tab col s3 admin-tabs"><Link style={styles.tabText} className="white-text" to='/companies'>Company Details</Link></li>
            <li style={this.onPage("employees")} className="tab col s3 admin-tabs"><Link style={styles.tabText} className="white-text" to='/employees'>Add Employees</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

const styles = {
  adminTab: {
    background: "linear-gradient(#666, #333)",
    border: "1px solid #666",
		backgroundColor: "#999",
    margin: '5px',
    lineHeight: '42px',
  },
  tabText: {
    textShadow: "0 0 10px rgba(0,0,0,0.75)",
    fontSize: '18px'
  },
  topMargin: {
    marginTop: '5px'
  },
  onTab: {
  background: 'linear-gradient(#1257a6, #1565C0)',
  border: "1px solid #666",
  backgroundColor: "#aaa",
  margin: '5px',
  lineHeight: '42px',
  color: '#0d3c73',
  textShadow: '0 0 10px rgba(255,255,255,0.5), 0 1px #8cb7e8',
  }
}

export default connect()(AdminNav)
