class CreatePresentations < ActiveRecord::Migration
  def change
    create_table :presentations do |t|
      t.integer :user_id
      t.text :data

      t.timestamps
    end
  end
end
