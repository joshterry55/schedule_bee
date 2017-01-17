export const currentemployee = (id) => {
	return(dispatch) => {
		$.ajax({
			url: `/api/users/${id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( employee => {
			dispatch({ type: 'CURRENT_EMPLOYEE', employee})
		})
	}
}
