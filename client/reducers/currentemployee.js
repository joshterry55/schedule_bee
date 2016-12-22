const currentemployee = (state = [], action) => {
  
	switch(action.type) {
    case "CURRENT_EMPLOYEE":
      return action.employee
    case "REMOVE_CURRENT_EMPLOYEE":
      return action.employee = []
		default:
			return state;
	}
}

export default currentemployee;
