Rails.application.routes.draw do

  
  get '/' => "home#top"
  get "/about" => "home#about"

  get "/posts/index" => "post#index"
  get "posts/new" => "post#new"
  post "posts/create" => "post#create"
  get "posts/:id/edit" => "post#edit"
  post "posts/:id/update"  => "post#update"
  post "posts/:id/delete" => "post#destroy"
  post "/posts/:id/comment" => "comment#create"
  
  get "users/index" => "users#index"
  get "users/:id/friends" => "users#user_friends"
  get "signup" => "users#new"
  post "users/create" => "users#create"
  get "users/:id/edit" => "users#edit"
  post "users/:id/update" => "users#update"
  get "users/search" => "users#search"

  get "login" => "users#login_form"
  post "login" => "users#login"
  post "logout" => "users#logout"

  

  resources :users do
    member do
      get :following, :followers
    end
  end
  resources :relationships, only: [:create, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post "/likes/:id/create" => "likes#create"
  post "/unlikes/:id/delete" => "likes#destroy"
end
