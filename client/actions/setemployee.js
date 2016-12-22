export const setemployee = (employees) => {
	return { type: 'SET_EMPLOYEE', employees }
}

export const removeemployee = () => {

	return { type: 'RESET_EMPLOYEE' }
}

export const currentemployee = (employee) => {
  return { type: 'CURRENT_EMPLOYEE', employee }
}

export const removecurrentemployee = () => {
  return { type: 'REMOVE_CURRENT_EMPLOYEE' }
}
