require 'zip'

class PresentationController < ApplicationController
  def build
    @num_slides = 0
    @num_slides = params[:num_slides].to_i if params[:num_slides].to_i > 0
    @layout = "vertical"
    @layout = params[:layout] if ["vertical", "linear", "circlev1", "circlev2", "circlev3", "circlev4", "chain", "lineargrid", "snakegrid", "verticalgrid", "deep"].include?(params[:layout])

    if params[:shape] == "rectangle"
      @shape_class = "slide"
    elsif params[:shape] == "circle"
      @shape_class = "slide-circle"
    else 
      @shape_class = ""
    end

    @automated = "false"
    @automated = params[:automated] if ["false", "true"].include?(params[:automated])
    @theme = "basic"
    @theme = params[:theme] if ["basic", "textured"].include?(params[:theme])
    @substeps = "false"
    @substeps = params[:substeps] if ["false", "true"].include?(params[:substeps])
    @progress_bar = "no-pbar"
    @progress_bar = params[:progress_bar] if ["no-pbar", "pbar1"].include?(params[:progress_bar])

    @example_slides = %w{title ollist ullist paragraph substeps blockquote table align colors}
  end

  def home
  end

  def download
    build
    data = render_to_string :build

    zip = Zip::OutputStream.write_buffer do |out|
      out.put_next_entry("index.html")
      out.write data
    end
    zip.rewind
    binary_zip = zip.sysread

    send_data(binary_zip, {filename: "impresscustomized.zip"})
  end
end
