import React from 'react';
import { connect } from 'react-redux';

const Dashboard = ({user}) => (
  <div>
    {`${user.first_name}, Welcome`}
  </div>
)

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Dashboard);
