import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { removecurrentemployee } from '../actions/setemployee'


class AdminNav extends React.Component {

  render() {
    return(
      <div className="row">
        <div className="col s12">
          <ul className="tabs tabs-fixed-width" style={styles.topMargin}>
            <li style={styles.adminTab} className="tab col s3 admin-tabs"><Link style={styles.tabText} className="white-text" to='/employees'>Employees</Link></li>
            <li style={styles.adminTab} className="tab col s3 admin-tabs"><Link style={styles.tabText} className="white-text" to='/settings'>Settings</Link></li>
            <li onClick={() => this.props.dispatch(removecurrentemployee())}style={styles.adminTab} className="tab col s3 admin-tabs"><Link style={styles.tabText} className="white-text" to='/companies'>Companies</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

const styles = {
  adminTab: {
    background: "linear-gradient(#999, #666)",
    margin: '5px',
    lineHeight: '42px',
  },
  tabText: {
    textShadow: "0 0 10px rgba(0,0,0,0.75)",
    fontSize: '18px'
  },
  topMargin: {
    marginTop: '5px'
  }
}

export default connect()(AdminNav)
