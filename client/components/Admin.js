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
        <p className='container'>
        Welcome, Admin
        {this.cael()}
        </p>
      </div>
    )
  }

}

export default Admin
