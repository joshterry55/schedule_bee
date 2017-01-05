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
          <div key={employee.id} className="col m6 s12">
            <div style={styles.contactCard}>
              <span style={styles.contactName}>{employee.first_name} {employee.last_name}</span><br />
              <span><b>Email:</b> {employee.email}</span> <br />
              <strong>Title:</strong> {employee.title ? employee.title : "n/a"} <br />
              <strong>Phone Number:</strong> {employee.phone} <br /><br />
            </div>
          </div>);
      });
    } else {
    }
  }

  render() {
    return(
      <div style={styles.contactColumn} className='center' >
        <br />
        <button className='btn blue darken-2' onClick={this.toggleContacts}>View Contacts List</button>
        <br /><br />
        <div className='row'>
          {this.showContactList()}
        </div>
      </div>
    )
  }
}

const styles = {
  contactColumn: {
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: 'inset 0 25px 25px -25px rgba(0,0,0,1)',
    marginTop: '1px',
    paddingTop: '10px',
    borderBottom: '10px solid white'
  },
  contactCard: {
    backgroundColor: '#ddd',
    borderRadius: '5px',
    boxShadow: '3px 3px 5px rgba(0,0,0,0.45)',
    margin: '15px 5px',
    padding: '10px'
  },
  contactName: {
    fontSize: '21px',
    fontWeight: 'bold'
  }
}

const mapStateToProps = (state) => {
  let { contactlist, setemployee } = state;
  return { contactlist, setemployee }
}


export default connect(mapStateToProps)(EmployeeContactList)
