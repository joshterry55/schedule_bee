export const updateemployees = (id) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/companies/${id}/users`,
      type: 'GET',
      dataType: 'JSON'
    }).done( employees => {
      
      dispatch({ type: 'SET_EMPLOYEE', employees });
    }).fail( data => {
      debugger
      console.log(data);
    });
  }
}
