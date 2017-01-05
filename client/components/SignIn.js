import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { setFlash } from '../actions/flash';

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let { email, password } = this.refs
    let user = { user: {
      email: email.value,
      password: password.value
    }}

    $.ajax({
      url: '/users/sign_in',
      type: 'POST',
      dataType: 'JSON',
      data: user
    }).done( user => {
      this.props.dispatch(login(user));
      this.props.history.push('/schedule')
    }).fail( err => {
      let message = err.responseJSON.error;
      this.props.dispatch(setFlash(message, 'error'))
    });
  }

  render() {
    return(
      <div className='container row' style={styles.signIn}>
        <h3 className='center'>Sign In</h3>
        <form onSubmit={this.handleSubmit}>
          <div className='col s8 offset-s2'>
            <input type="email" required={true} ref='email' placeholder='Email' />
            <input type='password' required={true} ref='password' placeholder='Password' />
          </div>
          <div className='col s12 center'>
            <button className='btn blue darken-3'>Sign In</button>
          </div>
        </form>
      </div>
    )
  }

}

const styles={
  signIn: {
    backgroundColor: '#E9EAED',
    width: '800px',
    height: '300px',
    padding: '5px',
    marginTop: '20px',
  },
}

export default connect()(SignIn)
