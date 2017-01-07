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
      <div className='container row'>
        <div style={styles.signIn} className="col s12 m10 offset-m1 center">
          <h3>Sign In</h3>
          <form onSubmit={this.handleSubmit}>
            <div className='col s8 offset-s2'>
              <input type="email" required={true} ref='email' placeholder='Email' />
              <input type='password' required={true} ref='password' placeholder='Password' />
            </div>
            <div className='col s12 center'>
              <button style={styles.button}>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

const styles={
  signIn: {
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

export default connect()(SignIn)
