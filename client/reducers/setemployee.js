const setemployee = (state = [], action) => {
	switch(action.type) {
    case "SET_EMPLOYEE":
      return action.employees
    case "RESET_EMPLOYEE":
      return action.employees = []
		default:
			return state;
	}
}

export default setemployee;
