class PresentationController < ApplicationController
  def build
    @num_slides = 0
    @num_slides = params[:num_slides].to_i if params[:num_slides].to_i > 0
    @layout = "vertical"
    @layout = params[:layout] if ["vertical", "linear", "circle"].include?(params[:layout])
  end

  def home
  end
end
