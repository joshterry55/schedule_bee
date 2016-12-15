import React from 'react';

class Admin extends React.Component {

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <div className="row">
          <div className="col s12">
            <ul className="tabs tabs-fixed-width">
              <li className="tab col s3"><a href="#test1">Test 1</a></li>
              <li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
              <li className="tab col s3"><a href="#test4">Test 4</a></li>
            </ul>
          </div>
        </div>
        I am on Admin

      </div>
    )
  }

}

export default Admin
