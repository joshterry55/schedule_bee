import React from 'react';
import AdminNav from './AdminNav'
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';

class Employees extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: false }

    this.inviteEmployee = this.inviteEmployee.bind(this);
    this.companiesOptions = this.companiesOptions.bind(this);
  }

  componentDidMount() {
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
    this.setState({ loading: true })
    $.ajax({
      url: '/users/invitation',
      type: 'POST',
      data: {
        company_id: this.refs.company.value,
        user: { email: this.refs.email.value,
                first_name: this.refs.firstName.value,
                last_name: this.refs.lastName.value }},
      dataType: 'JSON'
    }).done( employee => {
      this.setState({ loading: false })
      let messageSuccess = `Invitation sent to ${employee.email}`
      this.inviteForm.reset();
      this.props.dispatch(setFlash(messageSuccess, 'success'))
    }).fail( err => {
      let message = "Email already exists";

      this.props.dispatch(setFlash(message, 'error'))
    })
  }




  display() {
    if(this.props.assigned.length) {
      return(
        <form ref={(input) => this.inviteForm = input} className='row center' onSubmit={this.inviteEmployee}>
          <br />
          <div className='col s6 offset-s3'>
            <label>Select A Company</label>
            <select ref='company' defaultValue={this.props.setcompany.id}>
              { this.companiesOptions() }
            </select>
            <input ref='firstName' type='text' required placeholder='Employee First Name' />
            <input ref='lastName' type='text' required placeholder='Employee Last Name' />
            <input ref='email' type='email' required placeholder='Employee Email' />
              {this.loadingState()}
          </div>
        </form>
      );
    } else {
      return(<h3>Loading...</h3>);
    }
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
    } else {
      return(
        <input className='btn blue darken-3' type='submit' />
      )
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
    backgroundImage: 'url("http://res.cloudinary.com/dupyswzaa7/image/upload/v1483750352/beeAccent_l5fh3h.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom right'
  }
}

const mapStateToProps = (state) => {
  let { user, assigned, setcompany } = state;
  return { user, assigned, setcompany }
}

export default connect(mapStateToProps)(Employees)
