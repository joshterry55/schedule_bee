export const setcompany = (companyId) => {
	let company = { id: companyId }
	return { type: 'SET_COMPANY', company }
}

export const removesetcompany = () => {
  return { type: 'REMOVE_SET_COMPANY' }
}