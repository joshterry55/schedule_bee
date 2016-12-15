class CreateScheduleTemplates < ActiveRecord::Migration[5.0]
  def change
    create_table :schedule_templates do |t|
      t.string :name
      t.belongs_to :company, foreign_key: true

      t.timestamps
    end
  end
end
