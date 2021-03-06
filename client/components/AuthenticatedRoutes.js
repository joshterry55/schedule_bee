import React from 'react';
import { connect } from 'react-redux'
import { setFlash } from '../actions/flash';
import { login } from '../actions/auth';


class AuthenticatedRoutes extends React.Component {
  render() {
    return(
      <div>
        { this.props.user.id ? this.props.children : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user}
}

export default connect(mapStateToProps)(AuthenticatedRoutes)
