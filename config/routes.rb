Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :users do
      get 'invitations/new'
    end
  end

  devise_for :users, controllers: {
    registrations: "api/registrations",
    sessions: "api/sessions",
    invitations: "api/invitations"
  }

  namespace :api do
    # ajax calls go here
    get 'users/info'
    get 'companies/:id/users', as: 'companies/users', :to => 'users#index'
    get 'users/:id', as: 'users', :to => 'users#show'
    put 'users/:id', as: 'users/edit', :to => 'users#update'
    delete 'users/:id', as: 'users/delete', :to => 'users#destroy'
    get 'users/:id/shifts', as: 'users/shifts', :to => 'shifts#index'
    resources :shifts
    resources :companies
  end



  get '*unmatched_route', to: 'home#index'
  # nothing below this line!
end
