const user = (state = {}, action) => {
  switch(action.type) {
    case 'USER':
      let { id, role, first_name, last_name, title, company_id, assigned_companies, phone, wage, avatar, email } = action;
      return { id, role, first_name, last_name, title, company_id, assigned_companies, phone, wage, avatar, email }
    default:
      return state
  }
}

export default user
