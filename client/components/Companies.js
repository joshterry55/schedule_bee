import React from 'react';
import { connect } from 'react-redux';
import { addassigned } from '../actions/addassigned';


class Companies extends React.Component {
  constructor(props) {
    super(props)


    this.addCompany = this.addCompany.bind(this)
  }


  addCompany(e) {
    e.preventDefault();
    let newCompany = this.refs.companyName.value
    let assigned_companies = this.props.user.assigned_companies
    debugger
    $.ajax({
      type: "POST",
      url: '/api/companies',
      dataType: 'JSON',
      data: { company: {
        name: newCompany
      }}
    }).done( company => {
      // assigned_companies.push(data.id)
      debugger
      this.props.dispatch(addassigned(company))

    }).fail( data => {
      debugger
      console.log(data)
    })
  }

  render() {
    return(
      <div>

        Companies
        <form ref='companyForm' className="container" onSubmit={this.addCompany}>
          <input ref='companyName' type='text' />
          <input type="submit" className='btn blue darken-3' value='Add Company' />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}


export default connect(mapStateToProps)(Companies);
