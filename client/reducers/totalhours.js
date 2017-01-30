const totalhours = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_HOURS':
			return action.hourTotals
		default:
			return state;
	}
}

export default totalhours;
