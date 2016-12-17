const setdate = (state = {}, action) => {
	switch(action.type) {
		case "SET_DATE":
			let today = new Date()
			let numberOfDay = today.getDay();
			return numberOfDay;
		default:
			return state;
	}
}

export default setdate;