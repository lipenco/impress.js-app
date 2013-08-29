class PresentationController < ApplicationController
  def build
    @num_slides = 0
    @num_slides = params[:num_slides].to_i if params[:num_slides].to_i > 0
    @layout = "vertical"
    @layout = params[:layout] if ["vertical", "linear", "circlev1", "circlev2", "circlev3", "circlev4", "chain", "lineargrid", "snakegrid", "verticalgrid", "deep"].include?(params[:layout])
    @shape = "rectangle"
    @shape = params[:shape] if ["circle", "rectangle", "blank"].include?(params[:shape])
    @automated = "false"
    @automated = params[:automated] if ["false", "true"].include?(params[:automated])
    @theme = "basic"
    @theme = params[:theme] if ["basic", "textured"].include?(params[:theme])
    @substeps = "false"
    @substeps = params[:substeps] if ["false", "true"].include?(params[:substeps])
    @progress_bar = "no-pbar"
    @progress_bar = params[:progress_bar] if ["no-pbar", "pbar1"].include?(params[:progress_bar])
  end

  def home
  end
end
