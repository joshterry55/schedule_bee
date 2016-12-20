import React from 'react';
import AdminNav from './AdminNav'
import { connect } from 'react-redux';


class Employees extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { companies: [] }

    this.inviteEmployee = this.inviteEmployee.bind(this);
    this.companiesOptions = this.companiesOptions.bind(this);
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

  componentDidUpdate() {
    $('select').material_select();
  }

  companiesOptions() {
    return this.props.assigned.map( company => {
      return(<option key={company.id} value={company.id}>{company.name}</option>);
    });
  }

  inviteEmployee(e) {
    e.preventDefault();

    $.ajax({
      url: '/users/invitation',
      type: 'POST',
      data: {
        company_id: this.refs.company.value,
        user: { email: this.refs.email.value,
                first_name: this.refs.firstName.value,
                last_name: this.refs.lastName.value }},
      dataType: 'JSON'
    }).done( data => {
      // set success flash
      // clear the form
      console.log(data);
    }).fail( data => {
      console.log(data);
    })
  }

  display() {
    if(this.props.assigned.length) {
      return(
        <form onSubmit={this.inviteEmployee}>
          <label>Select A Company</label>
          <select ref='company'>
            { this.companiesOptions() }
          </select>
          <input ref='firstName' type='text' required placeholder='Employee First Name' />
          <input ref='lastName' type='text' required placeholder='Employee Last Name' />
          <input ref='email' type='email' required placeholder='Employee Email' />
          <input className='btn' type='submit' />
        </form>
      );
    } else {
      return(<h3>Loading...</h3>);
    }
  }

  render() {
    return(
      <div>
        <AdminNav />
        Employees
        { this.display() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assigned } = state;
  return { user, assigned }
}

export default connect(mapStateToProps)(Employees)
