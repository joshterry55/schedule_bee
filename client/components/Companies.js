import React from 'react';
import { connect } from 'react-redux';
import { addassigned } from '../actions/addassigned';
import AdminNav from './AdminNav';
import { Link } from 'react-router';
import { setFlash } from '../actions/flash';



class Companies extends React.Component {
  constructor(props) {
    super(props)

    this.addCompany = this.addCompany.bind(this)
    this.setCompany = this.setCompany.bind(this)
  }

  componentDidMount() {
    $('select').material_select();

    $.ajax({
      url: '/api/companies',
      type: 'GET',
      dataType: 'JSON'
    }).done( companies => {
      this.props.dispatch({ type: 'ASSIGNED', companies })
    }).fail( data => {
      console.log(data);
    });
  }

  addCompany(e) {
    e.preventDefault();
    let newCompany = this.refs.companyName.value
    let assigned_companies = this.props.user.assigned_companies
    $.ajax({
      type: "POST",
      url: '/api/companies',
      dataType: 'JSON',
      data: { company: {
        name: newCompany
      }}
    }).done( company => {
      this.props.dispatch(addassigned(company))
      this.refs.companyForm.reset()
      let message = 'Company Created'
      this.props.dispatch(setFlash(message, 'success'))
    }).fail( data => {
      console.log(data)
    })
  }

  setCompany(company) {
  }

  displayCompanies() {
    return this.props.assigned.map( company => {
      return(
        <div key={company.id}><Link onClick={() => this.setCompany(company)}className="collection-item" to={`/company/${company.id}`}>{company.name}</Link></div>
      );
    });
  }

  render() {
    return(
      <div>
        <AdminNav />
        <div className='row'>
          <div style={styles.companies} className="col s10 offset-s1 m8 offset-m2 center">
            <h3>Add Company</h3>
            <form ref='companyForm' className="center" onSubmit={this.addCompany}>
              <div className='col s10 offset-s1 m6 offset-m3'>
                <div className="col s10">
                  <input ref='companyName' type='text' placeholder='Company Name' />
                </div>
                <div className="col s2">
                  <input type="submit" style={styles.button} value='Add'/>
                </div>
              </div>
            </form>
            <br />
            <div className='col s12'>
              <h3>View Company Details</h3>
            </div>
            <div className='col s10 offset-s1 m8 offset-m2 collection' style={{padding: '0px', borderRadius: '10px', border: '2px solid #ccc'}}>
              {this.displayCompanies()}
            </div>
          </div>
          </div>
      </div>
    );
  }
}

const styles={
  companies: {
    backgroundColor: '#E9E9E9',
    borderRadius: '15px',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
    padding: '35px 5px 35px 5px',
    marginTop: '25px',
    backgroundImage: 'url("http://res.cloudinary.com/dupyswzaa7/image/upload/v1483750352/beeAccent_l5fh3h.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom right'
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
  let { user, assigned } = state;
  return { user, assigned }
}


export default connect(mapStateToProps)(Companies);
