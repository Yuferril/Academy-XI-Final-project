class ApplicationController < ActionController::Base
    helper_method :current_user

    include ActionController::Cookies
    include ActionController::Flash
    skip_before_action :verify_authenticity_token


    private
  
    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
  end
  