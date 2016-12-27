class Shift < ApplicationRecord
  validates_presence_of :day, :start, :end
  belongs_to :schedule_templates, optional: true
  belongs_to :user
  belongs_to :company
end
