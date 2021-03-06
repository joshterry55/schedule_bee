class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :role, default: 'employee'
      t.string :title
      t.belongs_to :company, foreign_key: true

      t.timestamps
    end
  end
end
