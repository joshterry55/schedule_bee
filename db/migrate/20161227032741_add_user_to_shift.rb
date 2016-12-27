class AddUserToShift < ActiveRecord::Migration[5.0]
  def change
    add_reference :shifts, :user, foreign_key: true
  end
end
