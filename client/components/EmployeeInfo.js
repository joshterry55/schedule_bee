import React from 'react';
import { connect } from 'react-redux';
import DropZone from 'react-dropzone';
import request from 'superagent';
require('superagent-rails-csrf')(request)


class EmployeeInfo extends React.Component {
  constructor(props) {
    super(props)

    let avatar;
    this.props.setemployee.map( employee => {
      if(this.props.user.id == employee.id) {
        avatar = employee.avatar
      }
    })
    if(avatar == undefined) {
      avatar = this.props.user.avatar
    }
    this.state = { edit: false, avatar: [avatar] }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.employeeUpdate = this.employeeUpdate.bind(this)
  }

  componentDidMount() {
    // $(body).css('background-color', 'black !important');
    let employee = this.props.user
    this.props.dispatch({type: 'CURRENT_EMPLOYEE', employee})

  }

  // componentWillMount() {
  //   let user = this.props.user
  //   this.props.dispatch({type: 'USER', ...user})
  // }

  onDrop = (files) => {
    let id = this.props.currentemployee.id
    let employee = this.props.user
    let file = files[0];
    let req = request.put(`api/users/${id}/avatar`);
    req.setCsrfToken();
    req.attach('avatar', file)
    req.end( (err, res) => {
      if(res.body) {
        this.setState({avatar: [res.body.avatar]})
      }
    })
  }

  employeeUpdate(e) {
    e.preventDefault()
    let phone = this.refs.phoneNumber.value
    let id = this.props.user.id
    $.ajax({
      type: "PUT",
      url: `/api/users/${id}`,
      dataType: 'JSON',
      data: { user: {
        phone: phone
      }}
    }).done( employee => {
      this.toggleEdit()
      this.props.dispatch({type: "CURRENT_EMPLOYEE", employee})
    }).fail( data => {
      console.log('failed')
    })
  }

  display() {
    let employee = this.props.currentemployee
    if(this.state.edit) {
      return(
        <div>
          <form onSubmit={this.employeeUpdate}>
            <input type='text' ref='phoneNumber' placeholder='Phone Number' defaultValue={employee.phone}/>
            <input type='submit' />
          </form>
          <DropZone multiple={false} onDrop={this.onDrop} />
        </div>
      )
    } else {
      return(
        <div>
          <div className="col s12 l5" style={{height: '300px', marginBottom: '15px'}}>
            <div style={{
              backgroundImage: `url(${this.state.avatar})`,
              width: '100%',
              height: '100%',
              maxWidth: '300px',
              display: 'block',
              backgroundSize: 'cover',
              borderRadius: '10px',
              boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
              margin: '25px auto'
            }}>
            </div>
          </div>
          <div className="col s12 l7" style={styles.infoContainer}>
            <h2>{employee.first_name} {employee.last_name}</h2>
            <h4>Phone Number</h4>
            <p>{employee.phone}</p>
            <h4>Email</h4>
            <p>{employee.email}</p>
            <h4>Title</h4>
            <p>{employee.title}</p>
          </div>
        </div>
      )
    }
  }

  // <img style={styles.avatar}src={this.state.avatar} />


  toggleEdit() {

    this.setState({ edit: !this.state.edit })
  }

  render() {
    let employee = this.props.currentemployee
    return(
      <div className="row">
        <div className="col s8 offset-s2" style={styles.myInfoBox}>
          {this.display()}
          <button onClick={this.toggleEdit}>Edit</button>
        </div>
      </div>
    )
  }

}

const styles = {
	myInfoBox: {
    backgroundColor: '#ddd',
    marginTop: '50px',
    borderRadius: '20px',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
  },
  infoContainer: {
    textAlign: 'center',
  }
}

const mapStateToProps = (state) => {
  let { user, currentemployee, setemployee } = state;
  return { user, currentemployee, setemployee }
}

export default connect(mapStateToProps)(EmployeeInfo)
