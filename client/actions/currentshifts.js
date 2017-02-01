export const currentshifts = (companyId, weekDates) => {
	return(dispatch) => {
		$.ajax({
			url: `/api/companies/${companyId}/shifts`,
			type: 'GET',
			dataType: 'JSON',
			data: { startday: weekDates}
		}).done( shifts => {
			$('#shiftLoadBox').css("display", "none")
			dispatch({ type: 'ALL_SHIFTS', shifts})
		})
	}
}
