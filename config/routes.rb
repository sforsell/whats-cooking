Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'recipes#index'
  get '/recipes/search', to: 'recipes#search'
  get '/recipes', to: 'recipes#show'
end
