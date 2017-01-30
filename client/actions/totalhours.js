export const totalhours = (currentShifts) => {
  return(dispatch) => {
  	let hourTotals = {};
  	currentShifts.map(shift => {
  		if (shift.user_id in hourTotals) {
  			hourTotals[shift.user_id] += shift.duration
  		} else {
  			hourTotals[shift.user_id] = shift.duration
  		}
  	})
  	dispatch({type: 'TOTAL_HOURS', hourTotals})
  }
}