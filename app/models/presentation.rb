class Presentation < ActiveRecord::Base
  attr_accessible :data, :name
  belongs_to :user
end
