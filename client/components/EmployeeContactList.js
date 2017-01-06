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
              <div style={{height: '100px', marginBottom: '10px'}}>
                <div style={{
                    backgroundImage: `url(${employee.avatar})`,
                    width: '100%',
                    height: '100%',
                    maxWidth: '100px',
                    display: 'block',
                    backgroundSize: 'cover',
                    borderRadius: '10px',
                    boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                    margin: '10px auto'
                  }}>
                </div>
              </div>
              <span style={styles.contactName}>{employee.first_name} {employee.last_name}</span><br />
              <span><b>Email:</b> {employee.email}</span> <br />
              <b>Title:</b> {employee.title ? employee.title : "N/A"} <br />
              <b>Phone Number:</b> {employee.phone ? employee.phone : "N/A"}
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
        <button style={styles.button} onClick={this.toggleContacts}>Show Contact Info</button>
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
  },
  button: {
    height: '30px',
    padding: '0 10px',
    margin: '6px 5px',
    borderRadius: '5px',
    border: '1px solid #666',
    background: "linear-gradient(#1c86ff, #1257a6)",
    boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
    fontSize: '20px',
    lineHeight: '25px',
    color: '#fff',
    textShadow: '0 0 10px rgba(0,0,0,0.5), 0 1px #8cb7e8'
  }
}

const mapStateToProps = (state) => {
  let { contactlist, setemployee } = state;
  return { contactlist, setemployee }
}


export default connect(mapStateToProps)(EmployeeContactList)
