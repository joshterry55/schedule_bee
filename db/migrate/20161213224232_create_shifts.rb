class CreateShifts < ActiveRecord::Migration[5.0]
  def change
    create_table :shifts do |t|
      t.string :day
      t.string :start
      t.string :end
      t.belongs_to :schedule_templates, foreign_key: true

      t.timestamps
    end
  end
end
