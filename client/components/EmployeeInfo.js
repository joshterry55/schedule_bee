import React from 'react';
import { connect } from 'react-redux';
import DropZone from 'react-dropzone';
import request from 'superagent';
import changeImage from '../../app/assets/images/changeImage.jpg';
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

  // <div>
  //   <form onSubmit={this.employeeUpdate}>
  //     <input type='text' ref='phoneNumber' placeholder='Phone Number' defaultValue={employee.phone}/>
  //     <input type='submit' />
  //   </form>
  //   <DropZone multiple={false} onDrop={this.onDrop} />
  // </div>

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
                backgroundImage: `url(${changeImage})`,
                width: '100%',
                height: '100%',
                maxWidth: '300px',
                display: 'block',
                backgroundSize: 'cover',
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
            <form onSubmit={this.employeeUpdate}>
              <label>Phone Number</label>
              <input type='text' ref='phoneNumber' placeholder='Phone Number' defaultValue={employee.phone}/>
              <input type='submit' />
            </form>
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
            <p>{employee.phone}</p>
            <h5>Email</h5>
            <p>{employee.email}</p>
            <h5>Title</h5>
            <p>{employee.title ? employee.title : 'N/A'}</p>
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
          <div className="col s12 center">
            <button style={styles.editButton} onClick={this.toggleEdit}>Edit</button>
          </div>
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
    paddingBottom: '25px'
  },
  infoContainer: {
    textAlign: 'center',
  },
  editButton: {
    height: '30px',
    padding: '0 10px',
    margin: '6px 5px',
    borderRadius: '5px',
    border: '1px solid #666',
    background: "linear-gradient(#1c86ff, #1257a6)",
    boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '25px',
    color: '#0d3c73',
    textShadow: '0 0 10px rgba(255,255,255,0.5), 0 1px #8cb7e8'
  }
}


const mapStateToProps = (state) => {
  let { user, currentemployee, setemployee } = state;
  return { user, currentemployee, setemployee }
}

export default connect(mapStateToProps)(EmployeeInfo)
