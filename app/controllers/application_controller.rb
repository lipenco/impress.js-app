class ApplicationController < ActionController::Base
  protect_from_forgery
  force_ssl
  private

  def logged_in?
    # require 'pry'; binding.pry
    !session[:user_id].nil?
  end
  helper_method :logged_in?

  # def current_user
  #   @current_user ||= User.find_by_auth_token!(cookies[:auth_token]) if cookies[:auth_token]
  # end
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def current_presentation
    @current_presentation ||= Presentation.find_by_id(params[:id])
  end
  helper_method :current_presentation

  def presentation_data
    return @presentation_data if defined? @presentation_data
    yaml_data = current_presentation.data
    @presentation_data = YAML.load(yaml_data)
  end
  helper_method :current_presentation
end
