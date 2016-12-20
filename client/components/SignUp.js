import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/auth'

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
      this.props.dispatch(login(user))
      this.props.history.push('/dashboard')
    }).fail( err => {
    })
  }


  render() {
    return(
      <div>
        <h2 className='center'>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <input placeholder='first name' ref='first_name' required={true} />
          <input placeholder='last name' ref='last_name' required={true} />
          <input type='email' placeholder='email' ref='email' required={true} />
          <input type='password' placeholder='password' ref='password' required={true} />
          <input type='password' placeholder='password confirmation' ref='password_confirmation' required={true} />
          <input type='hidden' ref='role' value='admin' />

          <button className='btn'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default connect()(SignUp)
