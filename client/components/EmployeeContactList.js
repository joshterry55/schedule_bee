import React from 'react'
import { connect } from 'react-redux'


class EmployeeContactList extends React.Component {
  constructor(props){
    super(props)

    this.toggleContacts = this.toggleContacts.bind(this)
    this.showContactList = this.showContactList.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({type: 'SET_CONTACT_LIST'})

  }

  toggleContacts(e) {

    e.preventDefault()
    this.props.dispatch({type: 'TOGGLE_CONTACT_LIST'})
    this.showContactList()
  }

  showContactList() {
    if(this.props.contactlist) {
      return this.props.setemployee.map( employee => {
        return(
          <div key={employee.id}>
            <strong>{employee.first_name} {employee.last_name}</strong>: <br />
            <strong>Email:</strong> {employee.email} <br />
            <strong>Phone Number:</strong> {employee.phone} <br /><br />
          </div>);
      });
    } else {
    }
  }

  render() {
    return(
      <div>
        <br />
        <button className='btn' onClick={this.toggleContacts}>Contact List</button>
        {this.showContactList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { contactlist, setemployee } = state;
  return { contactlist, setemployee }
}


export default connect(mapStateToProps)(EmployeeContactList)
