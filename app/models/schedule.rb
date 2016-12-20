class Schedule < ApplicationRecord
  has_many :schedule_templates
  has_many :users
end
