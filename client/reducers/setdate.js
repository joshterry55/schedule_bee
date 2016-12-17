const setdate = (state = {}, action) => {
	switch(action.type) {
		case "SET_DATE":
			let today = new Date()
			let numberOfDay = today.getDay();
			return numberOfDay;
		case "SET_WEEK":
				let today2 = new Date()
				let number2 = today2.getDay();
				let numberOfDay2 = (number2 + (7 * action.initial))
				return numberOfDay2;
		default:
			return state;
	}
}

export default setdate;
