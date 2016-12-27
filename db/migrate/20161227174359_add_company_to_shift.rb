class AddCompanyToShift < ActiveRecord::Migration[5.0]
  def change
    add_reference :shifts, :company, foreign_key: true
  end
end
