ImpressJsApp::Application.routes.draw do
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # match 'presentation' => 'presentation#new'
  match 'download' => 'presentation#download'
  match 'components' => 'presentation#components'
  match 'content' => 'presentation#content'
  match 'home'  => 'presentation#home'
  match 'images_background'  => 'presentation#images_background'
  match 'icons'  => 'presentation#icons'
  match 'deco'  => 'presentation#deco'
  match 'editor'  => 'presentation#editor'
  match 'fonts'  => 'presentation#fonts'
  match 'fontssize'  => 'presentation#fontssize'

  # match 'save_presentation' => 'presentation#save'

  resources :users
  resources :sessions

  post '/presentation/new', to: 'presentation#new'
  post '/presentation/:id/edit', to: 'presentation#edit'

  resources :presentation do
    post '/content', to: 'presentation#content'
    post '/:id/content', to: 'presentation#content'
  end



  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  root :to => 'presentation#dashboard'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
