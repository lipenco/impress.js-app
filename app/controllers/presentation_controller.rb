class PresentationController < ApplicationController
  def build
    @num_slides = 2
    @num_slides = params[:num_slides].to_i if params[:num_slides].to_i > 0
  end

  def home
  end
end
