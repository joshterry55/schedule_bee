class AddDetailsToShifts < ActiveRecord::Migration[5.0]
  def change
    add_column :shifts, :details, :text
  end
end
