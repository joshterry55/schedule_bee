// import React from 'react';

// const App = ({ children }) => (
//   <div>
//     Hello World
//     { children }
//   </div>
// )
//
// export default App;
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions/auth';
import Flash from '../components/Flash'
// I need an action to log out a user
// does the prevent default automatically
// materialize js
// font awesome
// user props
// logout action


class App extends React.Component {
  constructor(props) {
    super(props);
    this.navs = this.navs.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    $('.button-collapse').sideNav()
  }

  logout(e) {
    e.preventDefault()
    this.props.dispatch(logout(this.props.history))
  }

  navs() {
    switch(this.props.user.role) {
      case 'employee':
        return(
          <div>
            <li><Link to='/schedule'>Schedule</Link></li>
            <li><a style={{ cursor: 'pointer'}} onClick={this.logout}>Logout</a></li>
          </div>
        )
      case 'admin':
      return(
        <div>
          <li><Link to='/schedule'>Schedule</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
          <li><a style={{ cursor: 'pointer'}} onClick={this.logout}>Logout</a></li>
        </div>
      )
      default:
      return(
        <div>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/signin'>Signin</Link></li>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        <nav className='yellow darken-2'>
          <div className='nav-wrapper'>
            <Link to='/' className='brand-logo'>ScheduleBee</Link>
            <a href='#' data-activates='mobile' className='button-collapse'>
              <i className='fa fa-bars'></i>
            </a>
            <ul className='right hide-on-med-and-down'>
              {this.navs()}
            </ul>
            <ul className='side-nav' id='mobile'>
              {this.navs()}
            </ul>
          </div>
        </nav>
        { this.props.children }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(App);
