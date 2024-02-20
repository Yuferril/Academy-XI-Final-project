Rails.application.routes.draw do
  
  resources :users, only: [:index]
  resources :pokemons, only: [:index, :show, :new, :destroy, :edit, :update]
  resources :orders do
    resources :order_items, only: [:index, :create]
  end
  
  resources :users do
    resources :orders do
      get 'order_items', to: 'orders#order_items'
    end
    get 'orders', to: 'users#orders'
    get 'order_items', to: 'users#order_items'
  end

  post '/signup', to: "users#create"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
  post '/pokemons', to: "pokemons#create"
  # get '/pokemons', to: "pokemons#index"

  # namespace :admin do
  #   resources :pokemons
  # end

end
