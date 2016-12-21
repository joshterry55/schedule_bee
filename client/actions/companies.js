export const getcompanies = (companies = null) => {
	return(dispatch) => {
		$.ajax({
			url: '/api/companies',
			type: 'GET',
			dataType: 'JSON'
		}).done( companies => {
			dispatch({ type: 'ASSIGNED', companies })
		}).fail( data => {
			console.log(data);
		});
	}
}