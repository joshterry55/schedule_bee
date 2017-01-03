const shiftedit = (state = [], action) => {
	switch(action.type) {
    case "EDITTING_SHIFT":
      return action.shift
		default:
			return state;
	}
}

export default shiftedit;
