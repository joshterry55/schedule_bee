import React from 'react';
import { connect } from 'react-redux';
import { addassigned } from '../actions/addassigned';
import AdminNav from './AdminNav';
import { Link } from 'react-router'


class Companies extends React.Component {
  constructor(props) {
    super(props)


    this.addCompany = this.addCompany.bind(this)
    this.setCompany = this.setCompany.bind(this)
  }

  componentDidMount() {
    // do the ajax call to grab all the companies that this admin owns
    // set state of the companies
    // use the companies state to loop over and create the options in the select
    $('select').material_select();

    $.ajax({
      url: '/api/companies',
      type: 'GET',
      dataType: 'JSON'
    }).done( companies => {
      this.props.dispatch({ type: 'ASSIGNED', companies })
    }).fail( data => {
      console.log(data);
    });

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

  setCompany(company) {

    // this.props.dispatch({type: 'SET_COMPANY', company})
  }

  displayCompanies() {
    return this.props.assigned.map( company => {
      return(
        <div onClick={() => this.setCompany(company)}className="collection-item" key={company.id}><Link to={`/company/${company.id}`}>{company.name}</Link></div>
      );
    });
  }

  // <div key={company.id}>{company.name}</div>

  render() {
    return(
      <div>
        <AdminNav />
        <form ref='companyForm' className="row center" onSubmit={this.addCompany}>
          <div className='col s4 offset-s4'>
            <input ref='companyName' type='text' placeholder='Company Name' />
            <input type="submit" className='btn blue darken-3' value='Add Company'/>
          </div>
        </form>
        <br />
        <div className='container row collection'>
          {this.displayCompanies()}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { user, assigned } = state;
  return { user, assigned }
}


export default connect(mapStateToProps)(Companies);
