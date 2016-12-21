import React from 'react';
import { connect } from 'react-redux';
import { addassigned } from '../actions/addassigned';
import AdminNav from './AdminNav'


class Companies extends React.Component {
  constructor(props) {
    super(props)


    this.addCompany = this.addCompany.bind(this)
  }


  addCompany(e) {
    e.preventDefault();
    let newCompany = this.refs.companyName.value
    let assigned_companies = this.props.user.assigned_companies
    $.ajax({
      type: "POST",
      url: '/api/companies',
      dataType: 'JSON',
      data: { company: {
        name: newCompany
      }}
    }).done( company => {
      // assigned_companies.push(data.id)

      this.props.dispatch(addassigned(company))
      this.refs.companyForm.reset()
    }).fail( data => {

      console.log(data)
    })
  }

  render() {
    return(
      <div>
        <AdminNav />
        Companies
        <form ref='companyForm' className="container" onSubmit={this.addCompany}>
          <input ref='companyName' type='text' placeholder='Company Name' />
          <input type="submit" className='btn blue darken-3' value='Add Company'/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}


export default connect(mapStateToProps)(Companies);
