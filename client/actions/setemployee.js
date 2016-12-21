export const setemployee = (employees) => {
	return { type: 'SET_EMPLOYEE', employees }
}

export const removeemployee = () => {
  
	return { type: 'RESET_EMPLOYEE' }
}
