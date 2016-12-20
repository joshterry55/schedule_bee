class AddAssignedCompaniesToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :assigned_companies, :jsonb, default: [], array: true
  end
end
