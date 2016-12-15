class CreateSchedules < ActiveRecord::Migration[5.0]
  def change
    create_table :schedules do |t|
      t.string :date
      t.string :start
      t.string :end
      t.integer :user_id

      t.timestamps
    end
  end
end
