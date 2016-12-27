const shiftdate = (state = [], action) => {
	switch(action.type) {
    case "SHIFT_DATE":
      return action.date
		default:
			return state;
	}
}

export default shiftdate;
