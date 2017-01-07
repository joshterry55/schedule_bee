import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout, login } from '../actions/auth';
import Flash from '../components/Flash';
import { removeemployee, removecurrentemployee } from '../actions/setemployee'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.navs = this.navs.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    $('.button-collapse').sideNav({closeOnClick: true})
    this.props.dispatch(login());
  }

  logout(e) {
    e.preventDefault()
    this.props.dispatch(logout(this.props.history))
    this.props.dispatch(removeemployee())
    this.props.dispatch(removecurrentemployee())
  }

  navs() {
    switch(this.props.user.role) {
      case 'employee':
        return(
          <div>
            <li><Link to='/employeescheduleview'>My Schedule</Link></li>
            <li><Link to='/employeeinfo'>My Info</Link></li>
            <li><a style={{ cursor: 'pointer'}} onClick={this.logout}>Logout</a></li>
          </div>
        )
      case 'admin':
      return(
        <div>
          <li><Link to='/schedule'>Schedule</Link></li>
          <li><Link to='/companies'>Admin</Link></li>
          <li><Link to='/employeeinfo'>My Info</Link></li>
          <li><a style={{ cursor: 'pointer'}} onClick={this.logout}>Logout</a></li>
        </div>
      )
      default:
      return(
        <div>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/signin'>Signin</Link></li>
          <li><Link to='/about'>About</Link></li>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        <nav className='blue darken-3' id='top-nav'>
          <div className='nav-wrapper'>
            <Link to='/' className='brand-logo'><span className="logo-text">ScheduleBee</span> <span className="little-bee"></span></Link>
            <a href='#' data-activates='mobile' className='button-collapse'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              {this.navs()}
            </ul>
            <ul className='side-nav' id='mobile'>
              {this.navs()}
            </ul>
          </div>
        </nav>
        <Flash />
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(App);
