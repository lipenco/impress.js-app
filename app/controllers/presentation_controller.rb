class PresentationController < ApplicationController
  def build
    @num_slides = 0
    @num_slides = params[:num_slides].to_i if params[:num_slides].to_i > 0
    @layout = "vertical"
    @layout = params[:layout] if ["vertical", "linear", "circle"].include?(params[:layout])
    @shape = "rectangle"
    @shape = params[:shape] if ["circle", "rectangle"].include?(params[:shape])
    @automated = "false"
    @automated = params[:automated] if ["false", "true"].include?(params[:automated])
    @theme = "basic"
    @theme = params[:theme] if ["basic", "textured"].include?(params[:theme])
  end

  def home
  end
end
