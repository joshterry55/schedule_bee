export const currentshifts = (companyId) => {
	return(dispatch) => {
		$.ajax({
			context: this,
			url: `/api/companies/${companyId}/shifts`,
			type: 'GET',
			dataType: 'JSON'
		}).done( shifts => {
			dispatch({ type: 'ALL_SHIFTS', shifts})
		})
	}
}
