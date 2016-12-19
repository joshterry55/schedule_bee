Rails.application.routes.draw do
  namespace :api do
    namespace :users do
      get 'invitations/new'
    end
  end

  root 'home#index'

  devise_for :users, controllers: {
    registrations: "api/registrations",
    sessions: "api/sessions"
  }

  namespace :api do
    # ajax calls go here
    get 'users/info'
  end



  get '*unmatched_route', to: 'home#index'
  # nothing below this line!
end
