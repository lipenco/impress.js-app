class AddNameToPresentation < ActiveRecord::Migration
  def change
    add_column :presentations, :name, :string
  end
end
