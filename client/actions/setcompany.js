export const setcompany = (companyId) => {
	let company = { id: companyId }
	return { type: 'SET_COMPANY', company }
}