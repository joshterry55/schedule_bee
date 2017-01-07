import React from 'react';
import AdminNav from './AdminNav';
import { connect } from 'react-redux';
import { currentemployee, setemployee } from '../actions/setemployee';
import EmployeeView from './EmployeeView'
import { seteditcompanystate, toggleedit } from '../actions/editcompany'
// let companyEdit = false

class Company extends React.Component {
  constructor(props){
    super(props)


    this.editCompany = this.editCompany.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.submitEdittedCompany = this.submitEdittedCompany.bind(this)
  }

  componentDidMount() {
    $('select').material_select();

    let companyId = this.props.params.id

    $.ajax({
      url: `/api/companies/${companyId}/users`,
      type: 'GET',
      dataType: 'JSON'
    }).done( companies => {

      this.props.dispatch(setemployee(companies));
      this.props.dispatch(seteditcompanystate())

    }).fail( data => {
      console.log(data);
    });
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  componentWillMount() {
    $('select').material_select();

    let company = this.props.params.id

    $.ajax({
      url: `/api/companies/${company}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( company => {

      this.props.dispatch({type: 'SET_COMPANY', company})
    }).fail( data => {
      console.log(data);
    });
  }


  toggleEdit(e) {
    if(e != undefined) {
      e.preventDefault()
    }
    this.props.dispatch(toggleedit())
  }

  submitEdittedCompany(e) {
    e.preventDefault()
    let id = this.props.setcompany.id

    $.ajax({
      type: "PUT",
      url: `/api/companies/${id}`,
      dataType: 'JSON',
      data: { company: { name: this.refs.newCompanyName.value }}
    }).success( company => {
      this.props.dispatch({type: 'SET_COMPANY', company})
      this.toggleEdit()
    }).fail( data => {
      console.log('failed')
    })
  }

  editCompany() {
    let company = this.props.setcompany
    if(this.props.editcompany) {
      return(
        <form className='center col s10 offset-s1 m8 offset-m2 l6 offset-l3'ref='editCompanyForm' onSubmit={this.submitEdittedCompany}>
          <div className='col s10'>
            <input ref='newCompanyName' type='text' defaultValue={company.name} required placeholder="Company Name" />
          </div>
          <div className='col s2'>
            <button type='submit' style={{border: 'none', backgroundColor: 'Transparent'}}><i style={styles.saveCompany} className="material-icons">done</i></button>
          </div>
        </form>
      )
    } else {
      return(
        <div className='center'>
          <h2 className='center'>{company.name}<i className="small material-icons" style={styles.editCompany} onClick={() => this.toggleEdit()}>mode_edit</i></h2>
        </div>
      )
    }
  }



  render() {
    return(
      <div>
        <AdminNav />
        <div className='row'>
          <div style={styles.company} className="col s10 offset-s1 m8 offset-m2">
            { this.editCompany() }
            <div className="col s10 offset-s1 m8 offset-m2 l6 offset-l3">
              <br />
              <h4>Employees</h4>
              <EmployeeView />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styles={
  company: {
    backgroundColor: '#E9E9E9',
    borderRadius: '15px',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
    padding: '35px 5px 35px 5px',
    marginTop: '25px',
  },
  editCompany: {
    cursor: 'pointer',
    color: '#888'
  },
  saveCompany: {
    backgroundColor: 'Transparent',
    border: 'none',
    cursor: 'pointer'
  }
}

const mapStateToProps = (state) => {
  let { setcompany, setemployee, currentemployee, editcompany } = state;
  return { setcompany, setemployee, currentemployee, editcompany }
}

export default connect(mapStateToProps)(Company)
