const assigned = (state = [], action) => {
	switch(action.type) {
    case "ASSIGNED":
      return action.companies
		case "ADD_ASSIGNED":
			return [...state, action.id]
		default:
			return state;
	}
}

export default assigned;
