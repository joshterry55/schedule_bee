export const login = (user = null) => {
  return(dispatch) => {
    if(user) {
      dispatch(setUser(user))
    } else {
      $.ajax({
        url: '/api/users/info',
        type: 'GET',
        dateType: 'JSON'
      }).done( user => {
        dispatch(setUser(user))
      })
    }
  }
}

export const logout = (router) => {
  return (dispatch) => {
    $.ajax({
      url: '/users/sign_out',
      type: 'DELETE'
    }).done( user => {
      router.push('/')
      dispatch(setUser())
    }).fail( err => {

    })
  }
}

const setUser = (user = {}) => {
  return { type: 'USER', ...user }
}
