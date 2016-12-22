const editcompany = (state = [], action) => {
	switch(action.type) {
		case 'SET_COMPANY_EDIT':
			return false
    case 'TOGGLE_COMPANY_EDIT':
      return !state
		default:
			return state;
	}
}

export default editcompany;
