import React from 'react';
import { Link } from 'react-router'

class AdminNav extends React.Component {

  render() {
    return(
      <div className="row">
        <div className="col s12">
          <ul className="tabs tabs-fixed-width">
            <li className="tab col s3"><Link to='/employees'>Employees</Link></li>
            <li className="tab col s3"><Link to='/settings'>Settings</Link></li>
            <li className="tab col s3"><Link to='/admin'>Account</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default AdminNav
