const shiftdetails = (state = [], action) => {
	switch(action.type) {
    case "SHIFT_DETAILS":
      return action.shift
    case "NO_SHIFT_DETAILS":

      return []
		default:
			return state;
	}
}

export default shiftdetails;
