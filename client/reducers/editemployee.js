const editemployee = (state = [], action) => {
	switch(action.type) {
		case 'SET_EMPLOYEE_EDIT':
			return false
    case 'TOGGLE_EMPLOYEE_EDIT':
      return !state
		default:
			return state;
	}
}

export default editemployee;
