import React from 'react';
import AdminNav from './AdminNav'
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';


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
      // let message = data.responseJSON.success;
      // this.props.dispatch(setFlash(message, 'success'))
      this.inviteForm.reset();
      console.log('Invitation sent');
    }).fail( err => {
      let message = err.responseJSON.error;
      this.props.dispatch(setFlash(message, 'error'))
    });
  }

  display() {
    if(this.props.assigned.length) {
      return(
        <form ref={(input) => this.inviteForm = input} className='row center' onSubmit={this.inviteEmployee}>
          <br />
          <div className='col s6 offset-s3'>
            <label>Select A Company</label>
            <select ref='company'>
              { this.companiesOptions() }
            </select>
            <input ref='firstName' type='text' required placeholder='Employee First Name' />
            <input ref='lastName' type='text' required placeholder='Employee Last Name' />
            <input ref='email' type='email' required placeholder='Employee Email' />
            <input className='btn blue darken-3' type='submit' />
          </div>
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
        <div className="row">
          <div style={styles.inviteForm} className="col s10 offset-s1 m8 offset-m2 center">
            <h3 className='center'>Add Employee: Send Email</h3>
            <p className='container'><i> Employees are added by sending an email invitation.  Once the employee receives the email and clicks the link, they will be signed-in to view the schedule and their shifts.  <strong>Please note:</strong> employees will not be able to sign-in and see their shifts until they click the link in the invitation email.</i></p>
            { this.display() }
          </div>
        </div>
      </div>
    )
  }
}

const styles={
  inviteForm: {
    backgroundColor: '#E9E9E9',
    borderRadius: '15px',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
    padding: '5px 5px 25px 5px',
    marginTop: '25px',
  }
}

const mapStateToProps = (state) => {
  let { user, assigned } = state;
  return { user, assigned }
}

export default connect(mapStateToProps)(Employees)
