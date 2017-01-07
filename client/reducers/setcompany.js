const setcompany = (state = {}, action) => {
	switch(action.type) {
    case "SET_COMPANY":
      return action.company
    case "REMOVE_SET_COMPANY":
    	return action.company = []
		default:
			return state;
	}
}

export default setcompany;
