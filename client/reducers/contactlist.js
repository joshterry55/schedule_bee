const contactlist = (state = [], action) => {
	switch(action.type) {
		case 'SET_CONTACT_LIST':
			return false
    case 'TOGGLE_CONTACT_LIST':
      return !state
		default:
			return state;
	}
}

export default contactlist;
