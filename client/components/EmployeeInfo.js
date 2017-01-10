import React from 'react';
import { connect } from 'react-redux';
import DropZone from 'react-dropzone';
import request from 'superagent';
import changeImage from '../images/changeImage.jpg';
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
    let employee = this.props.user
    this.props.dispatch({type: 'CURRENT_EMPLOYEE', employee})

  }

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
          <div className="col s12 l5" style={{height: '300px', marginBottom: '15px', position: 'relative'}}>
            <div style={{
              backgroundImage: `url(${this.state.avatar})`,
              width: '100%',
              height: '100%',
              maxWidth: '300px',
              display: 'block',
              backgroundSize: 'cover',
              borderRadius: '10px',
              boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
              margin: '25px auto',
              backgroundColor: 'rgba(0,0,0,0.25)',
              zIndex: '1',

            }}>
            <DropZone style={{
                backgroundColor: '#aaa',
                backgroundImage: `url(${changeImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                width: '100%',
                height: '100%',
                maxWidth: '300px',
                display: 'block',
                borderRadius: '10px',
                margin: '0px auto',
                position: 'relative',
                opacity: '0.65',
                zIndex: '2',
              }} multiple={false} onDrop={this.onDrop} />
            </div>
          </div>
          <div className="col s12 l7" style={styles.infoContainer}>
            <h2>{employee.first_name} {employee.last_name}</h2>
            <h5>Phone Number</h5>
            <div className='col s10 offset-s1'>
              <form onSubmit={this.employeeUpdate}>
                <input type='text' ref='phoneNumber' placeholder='Phone Number' defaultValue={employee.phone} autoFocus />
                <button className="confirm-icon" style={styles.editButton} type='submit'><i className="material-icons">done</i>save</button>
              </form>
            </div>
            <h5>Email</h5>
            <p>{employee.email}</p>
            <h5>Title</h5>
            <p>{employee.title ? employee.title : 'N/A'}</p>
          </div>
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
            <h5>Phone Number</h5>
            <p>{employee.phone ? employee.phone : 'None Provided'}</p>
            <h5>Email</h5>
            <p>{employee.email}</p>
            <h5>Title</h5>
            <p>{employee.title ? employee.title : 'N/A'}</p>
          </div>
          <div className="col s12 center">
            <button className="edit-icon" style={styles.editButton} onClick={this.toggleEdit}><i className="material-icons">mode_edit</i>edit</button>
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
    paddingBottom: '25px',
    position: 'relative'
  },
  infoContainer: {
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: 'Transparent',
    border: '2px dashed rgba(0,0,0,0.4)',
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    color: 'rgba(0,0,0,0.4)',
    fontSize: '20px',
    lineHeight: '20px',
    borderRadius: '5px'
  }
}

const mapStateToProps = (state) => {
  let { user, currentemployee, setemployee } = state;
  return { user, currentemployee, setemployee }
}

export default connect(mapStateToProps)(EmployeeInfo)
