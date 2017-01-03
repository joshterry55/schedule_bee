class AddDurationToShifts < ActiveRecord::Migration[5.0]
  def change
    add_column :shifts, :duration, :integer
  end
end
