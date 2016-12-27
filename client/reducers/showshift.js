const showshift = (state = [], action) => {
	switch(action.type) {
    case "SHOW_SHIFT":
    
      return [...state, action.s]
    case "NO_SHIFT":

      return state
		default:
			return state;
	}
}

export default showshift;

// return this.props.assigned.map( company => {
//   return(
//     <div onClick={() => this.setCompany(company)}className="collection-item" key={company.id}><Link to={`/company/${company.id}`}>{company.name}</Link></div>
//   );
// });
