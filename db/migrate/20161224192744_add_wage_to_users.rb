class AddWageToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :wage, :string
  end
end
