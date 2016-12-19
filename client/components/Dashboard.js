import React from 'react';
import { connect } from 'react-redux';

const Dashboard = ({user}) => (
  <div>
    {`Welcome, ${user.first_name}.  Would you like to make a schedule?`}
  </div>
)

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Dashboard);
