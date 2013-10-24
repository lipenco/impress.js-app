require 'zip'

class PresentationController < ApplicationController
  layout "application", except: [:build]
  before_filter :load_presentation_from_params, only: %w(new download content)
  before_filter :load_presentation_from_database, only: %w(show edit)

  def new
  end

  def create
    if logged_in?
      presentation = current_user.presentations.create data: params.to_yaml
      redirect_to edit_presentation_path(presentation)
    end
  end

  def edit
    render action: :new
  end
  
  def destroy
  end

  def show
    render action: :new
  end

  def list
    @presentations = current_user.presentations
  end

  def update
    current_presentation.update_attributes(data: params.to_yaml)
  end

  def home
    @presentations = current_user.presentations
  end

  def dashboard
  end

  def images_background
  end

  def icons
  end

  def fonts
  end

  def fontssize
  end

  def deco
  end

  def components
  end

  def editor
  end

  def content
  end

  def download
    data = render_to_string :new
    data.gsub!('<script src="/', '<script src="./')
    data.gsub!('<link href="/', '<link href="./')


    js_path = Rails.root.join("vendor", "assets", "javascripts")
    css_path = Rails.root.join("vendor", "assets", "stylesheets")
    img_path = Rails.root.join("vendor", "assets", "images")

    zip = Zip::OutputStream.write_buffer do |out|
      out.put_next_entry("index.html")
      out.write(data)

      out.put_next_entry("assets/impress.js")
      out.write File.read js_path.join("impress.js")

      out.put_next_entry("assets/impress-layouts.js")
      out.write File.read js_path.join("impress-layouts.js")

      if params[:theme] == "basic"
        out.put_next_entry("assets/impress-theme1.css")
        out.write File.read css_path.join("impress-theme1.css")
      else 
        out.put_next_entry("assets/impress-theme2.css")
        out.write File.read css_path.join("impress-theme2.css")
        out.put_next_entry("assets/bg1.png")
        out.write File.read img_path.join("bg1.png")
        out.put_next_entry("assets/bg2.png")
        out.write File.read img_path.join("bg2.png")
        out.put_next_entry("assets/bg3.jpg")
        out.write File.read img_path.join("bg3.jpg")
      end

      if params[:substeps] == "false"
        out.put_next_entry("assets/navigation.js")
        out.write File.read js_path.join("navigation.js")
      else 
        out.put_next_entry("assets/substeps.css")
        out.write File.read css_path.join("substeps.css")
        out.put_next_entry("assets/substeps.js")
        out.write File.read js_path.join("substeps.js")
        out.put_next_entry("assets/navigation-substeps.js")
        out.write File.read js_path.join("navigation-substeps.js")
      end

      if params[:automated] == "true" && params[:substeps] == "false"
        out.put_next_entry("assets/automated.js")
        out.write File.read js_path.join("automated.js")
      elsif params[:automated] == "true" && params[:substeps] == "true"
        out.put_next_entry("assets/automated-substeps.js")
        out.write File.read js_path.join("automated-substeps.js") 
      end

      if params[:progress_bar] == "pbar1"
        out.put_next_entry("assets/progressbar.css")
        out.write File.read css_path.join("progressbar.css")
        out.put_next_entry("assets/progressbar.js")
        out.write File.read js_path.join("progressbar.js") 
      end        
    end
    zip.rewind
    binary_zip = zip.sysread

    send_data(binary_zip, {filename: "impress-customized.zip"})
  end

  private
  def load_presentation_from_params
    @num_slides = 8
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

    @example_slides = %w{title ollist ullist paragraph substeps blockquote align colors}
    @content = params[:content]
    @background = params[:background] 
    @wallpaper = params[:wallpaper] 
    @text = params[:text] 
  end

  def load_presentation_from_database
    @num_slides = presentation_data[:num_slides].to_i
    @layout =  presentation_data[:layout]
    @shape_class = presentation_data[:shape_class]
    @automated =  presentation_data[:automated]
    @theme =  presentation_data[:theme]
    @substeps =  presentation_data[:substeps]
    @progress_bar =  presentation_data[:progress_bar]
    @example_slides =  presentation_data[:example_slides] || %w{title ollist ullist paragraph substeps blockquote align colors}
    @content =  presentation_data[:content]
    @background =  presentation_data[:background]
    @wallpaper =  presentation_data[:wallpaper]
    @text =  presentation_data[:text]
  end
end
