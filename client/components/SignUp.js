import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { setFlash } from '../actions/flash';


class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let { first_name, last_name, email, password, password_confirmation, role } = this.refs;
    let company_id = 1
    let user = { user: {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      role: role.value,
      company_id
    }}
    $.ajax({
      url: '/users',
      type: 'POST',
      data: user,
      dataType: 'JSON'
    }).done( user => {
      debugger
      this.props.dispatch(login(user))
      this.props.history.push('/dashboard')
    }).fail( err => {
      let message = "Error Signing In";
      this.props.dispatch(setFlash(message, 'error'))
    })
  }


  render() {
    return(
      <div className='container row'>
        <div className='col s12 m10 offset-m1 center' style={styles.signUpContainer}>
          <h3>Admin Sign Up</h3>
          <h6>If you are an employee, request a login from your manager.</h6><br />
          <div className='center'>
            <form onSubmit={this.handleSubmit}>
              <div className="col s8 offset-s2">
                <input placeholder='First Name' ref='first_name' required={true} />
                <input placeholder='Last Name' ref='last_name' required={true} />
                <input type='email' placeholder='Email' ref='email' required={true} />
                <input type='password' placeholder='Password' ref='password' required={true} />
                <input type='password' placeholder='Password Confirmation' ref='password_confirmation' required={true} />
                <input type='hidden' ref='role' value='admin' />
              </div>
              <div className='col s12'>
                <button style={styles.button}>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  signUpContainer: {
    backgroundColor: '#E9E9E9',
    borderRadius: '15px',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
    padding: '5px 5px 35px 5px',
    marginTop: '25px',
    backgroundImage: 'url("http://res.cloudinary.com/dupyswzaa7/image/upload/v1483750352/beeAccent_l5fh3h.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom right'
  },
  button: {
    padding: '10px 25px',
    borderRadius: '5px',
    border: '1px solid #666',
    background: "linear-gradient(#1c86ff, #1257a6)",
    boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
    fontSize: '25px',
    fontWeight: 'bold',
    lineHeight: '15px',
    color: '#fff',
    textShadow: '0 0 10px rgba(0,0,0,0.5), 0 1px #999'
  }
}

export default connect()(SignUp)
