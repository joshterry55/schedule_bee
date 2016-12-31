const currentshifts = (state = [], action) => {

	switch(action.type) {
    case "ALL_SHIFTS":
      return action.shifts
    case 'ADD_CURRENT_SHIFT':
    	return [...state, action.shift] 
    case 'DELETE_CURRENT_SHIFT':
    	let index = state.findIndex( s => s.id === action.shift.id)
			return [
				...state.slice(0, index),
				...state.slice(index + 1)
			]
			break;
		default:
			return state;
	}
}

export default currentshifts;