import React from 'react';
import AdminNav from './AdminNav'

class Admin extends React.Component {

  componentDidMount() {

  }

  cael() {
    let d = new Date()
    return(
      d.getDay()
    )
  }

  render() {
    return(

      <div>
        <AdminNav />
        I am on Admin
        {this.cael()}

      </div>
    )
  }

}

export default Admin
