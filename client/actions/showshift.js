export const showshift = (shift, shiftdate) => {
  return(dispatch) => {
    shift.map(s => {
      if(s.day === shiftdate){
        dispatch({type: 'SHOW_SHIFT', s})
      } else {
        dispatch({type: 'NO_SHIFT'})
      }
    })
  }
}
